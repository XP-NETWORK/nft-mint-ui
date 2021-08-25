import { elrondHelperFactory, polkadotPalletHelperFactory, web3HelperFactory } from 'testsuite-ts';
import { ChainConfig, ElrondDappConfig } from '../config';
import { web3Accounts, web3Enable, web3FromAddress } from '@polkadot/extension-dapp';

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
    async polkadotSigner(address) {
        await this._requirePolkadotExt();

        const injector = await web3FromAddress(address);

        return { sender: address, options: { signer: injector.signer } };
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