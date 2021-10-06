import {
  elrondHelperFactory,
  polkadotPalletHelperFactory,
  baseWeb3HelperFactory,
  baseTronHelperFactory,
} from "testsuite-ts";
import { ChainConfig, ElrondDappConfig, CHAIN_INFO } from "../config";
import { ethers } from "ethers";
import TronWeb from "tronweb";
import { UserSigner } from "@elrondnetwork/erdjs/out";
import detectEthereumProvider from "@metamask/detect-provider";
import { Contract } from "testsuite-ts/node_modules/ethers";
import { abi } from "../assets/data/minterabi.json";

/*const nft_info_encoded_t = new StructType('EncodedNft', [
    new StructFieldDefinition('token', '', new TokenIdentifierType()),
    new StructFieldDefinition('nonce', '', new U64Type())
]);*/

/**
 * POST request helper function
 * @param {String} route
 * @param {Object} data
 * @returns Success confirmation || Error message
 */
export async function post(route, data) {
  let err;
  // Save the result of the POST request
  const resp = await fetch(route, {
    method: "POST",
    body: data,
  }).catch((e) => (err = e));

  if (err) {
    return [undefined, err];
  }

  // Return the JSON formatted response
  return [await resp.json(), undefined];
}

/**
 * Wrapper over PolkadotPalletHelper
 */
export function PolkadotHelper() {
  let polka = undefined;

  async function requirePolka() {
    if (polka === undefined) {
      polka = await polkadotPalletHelperFactory(ChainConfig.xpnode);
    }
  }

  return {
    ident: "XP.network",
    /**
     * @returns inner PolkadotPalletHelper
     */
    async inner() {
      await requirePolka();

      return polka;
    },
  };
}

/**
 * Wrapper over ElrondHelper from testsuite-ts
 */
export function ElrondHelper() {
  let elrd = undefined;

  async function requireElrd() {
    if (elrd === undefined) {
      elrd = await elrondHelperFactory(
        ChainConfig.elrond_node,
        ChainConfig.elrond_minter,
        ChainConfig.elrond_esdt,
        ChainConfig.elrond_esdt_nft
      );
    }
  }

  return {
    ident: "Elrond",
    /**
     *
     * @returns Inner ElrondHelper from testsuite-ts
     */
    async inner() {
      await requireElrd();

      return elrd;
    },
    async elrondMintableNfts(address) {
      let err;
      const resp = await fetch(
        `${ElrondDappConfig.gatewayAddress}/address/${address}/esdts-with-role/ESDTRoleNFTCreate`
      ).catch((e) => (err = e));

      if (err) {
        return [undefined, err];
      }

      const dat = await resp.json();

      return [dat.data && dat.data.tokens, undefined];
    },
    /**
     * Create elrond user signer from pem
     *
     * @param {string} pk pem content
     * @returns Elrond UserSigner
     */
    async signerFromPk(pk) {
      return UserSigner.fromPem(pk);
    },
  };
}

/**
 * Wrapper over Web3Helper from testsuite-ts
 *
 * @param {string} chain identifier of the web3 chain
 */
export const Web3Helper = () => {
  let web3 = undefined;
  let web3Provider = undefined;

  async function requireWeb3() {
    if (!web3Provider) {
      const web = await detectEthereumProvider();
      web3Provider = new ethers.providers.Web3Provider(web);
    }
    if (!web3) {
      web3 = await baseWeb3HelperFactory(web3Provider);
    }
  }

  return {
    /**
     * @returns Inner Web3Helper from testsuite-ts
     */
    async inner() {
      await requireWeb3();

      return web3;
    },
    /**
     * Create ethers Wallet object from private key
     *
     * @param {string} pk private key
     * @returns ethers Wallet object
     */
    async signerFromPk(pk) {
      await requireWeb3();

      return await web3Provider.getSigner(pk);
    },
    async setWeb3Chain(chain) {
      await requireWeb3();

      const info = CHAIN_INFO[chain];
      const chainId = `0x${info.chainId.toString(16)}`;
      try {
        await web3Provider.provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId }],
        });
      } catch (err) {
        if (err.code === 4902) {
          await web3Provider.provider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId,
                chainName: chain,
                nativeCurrency: {
                  name: info.native,
                  symbol: info.native,
                  decimals: Math.log10(info.decimals),
                },
                rpcUrls: [info.rpcUrl],
                blockExplorerUrls: [info.blockExplorerUrls],
              },
            ],
          });
        }
      }
    },
    async listAccounts() {
      await requireWeb3();

      return await web3Provider.listAccounts();
    },
    async getTokenId(chain) {
      await requireWeb3();
      const contract_address = CHAIN_INFO[chain].contract;
      const contract = new Contract(contract_address, abi, web3Provider);
      return await contract.tokenId();
    },
  };
};

export function TronHelper() {
  let tronWeb = undefined;
  let tronWebp = undefined;

  async function requireTron() {
    if (tronWeb === undefined) {
      tronWeb = window.tronLink;
      tronWebp = await baseTronHelperFactory(tronWeb.tronWeb);
    }
  }

  return {
    ident: "Tron",
    async inner() {
      await requireTron();

      return tronWebp;
    },
    async listAccounts() {
      await requireTron();
      return await tronWeb.request({ method: "tron_requestAccounts" });
    },
    async getTokenId() {
      await requireTron();
      const c_address = CHAIN_INFO["Tron"].contract;
      const contract = await tronWeb.tronWeb.contract().at(c_address);
      return (await contract.tokenId().call()).toNumber();
    },
    signerFromPk: (pk) => tronWeb.tronWeb.setPrivateKey(pk),
  };
}

/**
 * Factories for Chains by Chain Name
 */
export const ChainFactory = {
  "XP.network": PolkadotHelper(),
  Elrond: ElrondHelper(),
  Web3: Web3Helper(),
  Tron: TronHelper(),
};

/**
 * Mints an NFT on a Web3 compatible blockchain
 * @param {string} chain - the blockchain where NFT will be minted
 * @param {string} contract_owner -  the owner of the smart contract
 * @param {string} contract - the address of the smart contract
 * @param {string | number} token - token representation
 * @param {string} owner - the target owner of the token
 * @param {string} uri - the info linked to the token
 */
export const mintWeb3NFT = async (chain, owner, uri) => {
  const contract = CHAIN_INFO[chain].contract;
  const helper = ChainFactory[chain === "Tron" ? "Tron" : "Web3"];
  const inner = await helper.inner();
  console.log(
    await inner.mintNft(await helper.signerFromPk(owner), {
      contract,
      uri,
    })
  );
};
