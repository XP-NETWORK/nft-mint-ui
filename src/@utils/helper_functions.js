import { elrondHelperFactory, polkadotPalletHelperFactory, baseWeb3HelperFactory } from 'testsuite-ts';
import {
    ChainConfig,
    ElrondDappConfig,
    CHAIN_INFO,
    chains,

} from '../config';
import { web3Accounts, web3Enable, web3FromAddress } from '@polkadot/extension-dapp';
import { ethers, Wallet } from 'ethers';

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
    const resp = await fetch(route,
        {
            method: "POST",
            body: data
        })
        .catch((e) => err = e);

    if (err) {
        return [undefined, err];
    }

    // Return the JSON formatted response
    return [await resp.json(), undefined];
}

export const ChainHandlers = {
    _polka: undefined,
    _polkaExtInit: undefined,
    _elrd: undefined,
    async _requirePolkadotExt() {
        if (!this._polkaExtInit) {
            await web3Enable('XPNET Cross Chain Bridge');
            this._polkaExtInit = true;
        }
    },
    async _requirePolka() {
        if (!this._polka) {
            this._polka = await polkadotPalletHelperFactory(
                ChainConfig.xpnode,
                //ChainConfig.xp_freezer,
                //ChainConfig.xp_freezer
            );
        }
    },
    async polka() {
        await this._requirePolka();

        return this._polka;
    },
    async polkadotAccounts() {
        await this._requirePolkadotExt();

        return (await web3Accounts())
            .map((v) => v.address)
    },
    async _requireElrd() {
        if (!this._elrd) {
            this._elrd = await elrondHelperFactory(
                ChainConfig.elrond_node,
                ChainConfig.elrond_minter,
                ChainConfig.elrond_event_rest,
                ChainConfig.elrond_esdt,
                ChainConfig.elrond_esdt_nft
            );
        }
    },
    async elrd() {
        await this._requireElrd();

        return this._elrd;
    },
    async elrondMintableNfts(address) {
        let err;
        const resp = await fetch(`${ElrondDappConfig.gatewayAddress}/address/${address}/esdts-with-role/ESDTRoleNFTCreate`).catch((e) => err = e);

        if (err) {
            return [undefined, err];
        }

        const dat = await resp.json();

        return [dat.data && dat.data.tokens, undefined];
    }
}

/**
 * Create ethers Wallet object from private key
 * 
 * @param {string} pk private key
 * @returns ethers Wallet object
 */
export const signerFromPk = (pk, web3Provider) => {
    return new Wallet(pk, web3Provider);
}

/**
 * Creates a provider from the name of the blockchain if it exists
 * @param {string} chain 
 * @returns the provider | undefined
 */
export const getProvider = async (chain) => {

    try {
        if (chains.includes(chain)) {
            const provider = await ethers.providers.getDefaultProvider(CHAIN_INFO[chain].rpcUrl);
            return provider;
        } else {
            console.error("No chain was provided or the chain is not supported");
            return undefined;
        }

    } catch (error) {
        console.error(error);
        return undefined;
    }
}

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

        // TODO: refactor - this will create a new provider on every call
        const provider = ethers.providers.getDefaultProvider(CHAIN_INFO[chain].rpcUrl);

        if (provider && [chains[1], chains[3], chains[4]].includes(chain)) {

            console.log(provider, chain)

            const contract = CHAIN_INFO[chain].contract;
            const helper = await baseWeb3HelperFactory(provider);

            await helper.mintNft(
                signerFromPk(CHAIN_INFO[chain].contract_owner, provider),
                {
                    contract,
                    token,
                    owner,
                    uri
                }
            )
        }

}
