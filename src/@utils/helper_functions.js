import {
  elrondHelperFactory,
  polkadotPalletHelperFactory,
  baseWeb3HelperFactory,
  baseTronHelperFactory,
} from "testsuite-ts";
import { ChainConfig, ElrondDappConfig, CHAIN_INFO } from "../config";
import { ethers, Wallet } from "ethers";
import TronWeb from "tronweb";
import { UserSigner } from "@elrondnetwork/erdjs/out";
import detectEthereumProvider from "@metamask/detect-provider";

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
export function Web3Helper(chain) {
  let web3 = undefined;
  let web3Provider = undefined;

  async function requireWeb3() {
    if (!web3) {
      web3Provider = await detectEthereumProvider();
      web3 = await baseWeb3HelperFactory(web3Provider);
    }
  }

  return {
    ident: chain,
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

      return new Wallet(pk, web3Provider);
    },
  };
}

export function TronHelper() {
  let tronWeb = undefined;
  let tronWebp = undefined;

  async function requireTron() {
    if (tronWeb === undefined) {
      tronWebp = new TronWeb({
        fullHost: CHAIN_INFO["Tron"].rpcUrl,
        privateKey: CHAIN_INFO["Tron"].contract_owner,
      });
      tronWeb = await baseTronHelperFactory(tronWebp);
    }
  }

  return {
    ident: "Tron",
    async inner() {
      await requireTron();

      return tronWeb;
    },
    signerFromPk: (pk) => Promise.resolve(pk),
  };
}

/**
 * Factories for Chains by Chain Name
 */
export const ChainFactory = {
  "XP.network": PolkadotHelper(),
  Elrond: ElrondHelper(),
  HECO: Web3Helper("HECO"),
  BSC: Web3Helper("BSC"),
  Ropsten: Web3Helper("Ropsten"),
  Avalanche: Web3Helper("Avalanche"),
  Polygon: Web3Helper("Polygon"),
  Fantom: Web3Helper("Fantom"),
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
export const mintWeb3NFT = async (chain, token, owner, uri) => {
  const contract = CHAIN_INFO[chain].contract;
  const helper = ChainFactory[chain];
  const inner = await helper.inner();

  await inner.mintNft(
    await helper.signerFromPk(CHAIN_INFO[chain].contract_owner),
    {
      contract,
      token,
      owner,
      uri,
    }
  );
};
