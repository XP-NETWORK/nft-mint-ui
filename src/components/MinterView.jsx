import React, { useState } from "react";
import { useWindowSize } from "../@utils/hooks";
import XPLogo from "../assets/SVG/XPLogo";
import XPSelect from "./XPSelect";
import { Ledgers } from "../assets/data/ledgers";

import PlokadotMintNftView from "./PolkadotMintNftView";
import ElrondMintNftView from "./ElrondMintNftView";
import XPWeb3MintView from './Web3MintView';
import ESDTMint from "./ElrondESDTView";

import { UnsignedPreset, CHAIN_INFO } from "../config";
import { ChainHandlers, post, mintWeb3NFT } from "../@utils/helper_functions";
import * as Elrond from "@elrondnetwork/dapp";
import * as Erdjs from "@elrondnetwork/erdjs/out";
import { postCreateNFT } from "../@utils/createNFT";

/**
 *
 * @returns the JSX of the application
 */
function MinterView() {
  // Hook to extract the size of the window
  const windowSise = useWindowSize();

  // ==============================================================
  //                            S T A T E
  // ==============================================================

  const [ledger, setLedger] = useState(Ledgers[0].label);

  // POLKADOT STATE
  const [polkaAddress, setPolkaAddress] = useState("");

  // Common image blob storage
  const [blob, setBlob] = useState("");
  const [success, setSuccess] = useState("");
  const [inactive, setInactive] = useState(false);
  const [url, setUrl] = useState("");

  // ELROND STATE
  // ESDT token storage
  // address
  const [address, setAddress] = useState("");
  const [esdt, setEsdt] = useState("");
  // The name of the NFT
  const [name, setName] = useState("");
  // Min 0%, Max 50%
  const [royalties, setRoyalties] = useState(0);
  // Min 1, Max eternity
  const [copies, setCopies] = useState(1);
  // Max 140 characters
  const [description, setDescription] = useState("");
  // The number of rows to display the entire description
  const [descrRows, setDescrRows] = useState(1);

  const sendElrdTx = Elrond.useSendTransaction();

  // ELROND ESDT MINTING
  const [esdtName, setEsdtName] = useState("");
  const [esdtTicker, setEsdtTicker] = useState("");


  // WEB3 COMPATIBLE (BSC, Ethereum, HECO)
  const [web3MinterTokenID, setWeb3MinterTokenID] = useState('');
  const [web3MinterOwnerAccount, setWeb3MinterOwnerAccount] = useState('');
  const [web3MinterNFTName, setWeb3MinterNFTName] = useState('');
  const [web3MinterAssetLInk, setWeb3MinterAssetLInk] = useState('');

  // ==================================================
  //                COMMON HANDLERS
  // ==================================================

  const handleChangeFiles = (files) => {
    if (files) {
      setBlob(files);
    }
  };

  const uploadImage = async () => {
    const formdat = new FormData();
    formdat.append("file", blob);
    formdat.append("upload_preset", UnsignedPreset);
    const res = await post(
      "https://api.cloudinary.com/v1_1/xp-network/image/upload",
      formdat
    );
    return res[0].url;
  };

  const handleClickCreate = async () => {
    setInactive(true);
    try {
      switch (ledger) {
        case Ledgers[0].label: {
          const polka = await ChainHandlers.polka();
          const signer = await ChainHandlers.polkadotSigner(polkaAddress);
          const encoder = new TextEncoder();
          console.log(encoder.encode(url));

          await postCreateNFT(
            {
              link: url,
              name: name,
              data: `${'XP.network'},${polkaAddress}`
            },
            (hash) => polka.mintNft(signer, encoder.encode(hash))
          );
          break;
        }
        case Ledgers[1].label: {
          const elrd = await ChainHandlers.elrd();
          // const txu = elrd.unsignedMintNftTxn(new Erdjs.Address(address), {
          //   identifier: esdt.toString(),
          //   quantity: parseInt(copies),
          //   name: name.toString(),
          //   royalties: parseInt(royalties),
          //   attrs: description.toString(),
          //   uris: [url],
          // });

          // console.log(txu);

          // const txHash = sendElrdTx();
          // console.log(txHash);
          // postCreateNFT({link: url , name: name, data: description}, () => {
          //   const txHash = sendElrdTx()
          // });

          let txu = await postCreateNFT(
            {
              link: url,
              name: name,
              data: `${"Elrond"},${address},${esdt}`,
            },
            (hash) =>
              elrd.unsignedMintNftTxn(new Erdjs.Address(address), {
                identifier: esdt.toString(),
                quantity: parseInt(copies),
                name: name.toString(),
                royalties: parseInt(royalties),
                attrs: description.toString(),
                uris: [hash],
              })
          );
          sendElrdTx({
            transaction: txu,
            callbackRoute: "/processelrd",
          });

          break;
        }
        case Ledgers[2].label: {
          const elrd = await ChainHandlers.elrd();
          const txu = elrd.unsignedIssueESDTNft(esdtName, esdtTicker);



          sendElrdTx({
            transaction: txu,
            callbackRoute: "/processesdt",
          });
          break;
        }
        default:
          break;
      }

      setSuccess("success");
    } catch (error) {
      console.error(error);
      setSuccess("failure");
    } finally {
      setTimeout(() => {
        setInactive(false);
      }, 3000);
    }
  };

  const handlePolkaAccountChange = (e) => {
    const val = e.target.value;
    val ? setPolkaAddress(val) : setPolkaAddress("");
  };

  // ==================================================
  //                ELROND HANDLERS
  // ==================================================

  const handleAccountChange = (e) => {
    const val = e.target.value;
    setAddress(val);
  };

  const handleChangeESDT = (e) => {
    const val = e.value;
    setEsdt(val);
    console.log(esdt);
  };

  /**
   * Handles the Description onChange event
   *
   * Mutates the description value in the state
   * @param {Event} e the pointer to the event emitter
   */
  const handleChangeDescription = (e) => {
    const val = e.target.value;
    if (val.length < 141) {
      setDescription(val);

      const width = windowSise.width <= 600 ? windowSise.width : 600;

      if (width - 40 < val.length * 6.6) {
        setDescrRows(Math.ceil((val.length * 6.6) / (width - 40)));
      }
    }
  };

  /**
   * Handles the Asset Name onChange event
   *
   * Mutates the name value in the state
   * @param {Event} e the pointer to the event emitter
   */
  const handleChangeTitle = (e) => {
    const val = e.target.value;
    if (val) {
      setName(val);
    } else setName("");
  };

  /**
   * Handles the Royalties onChange event
   *
   * Mutates the royalties value in the state
   * @param {Event} e the pointer to the event emitter
   */
  const handleRoyaltiesChange = (e) => {
    let val = e.target.value;
    val = val ? parseInt(val) : 0;
    if (0 <= val && val < 51) {
      setRoyalties(val);
    }
  };

  /**
   * Handles the Copies onChange event
   *
   * Mutates the copies value in the state
   * @param {Event} e the pointer to the event emitter
   */
  const handleChangeCopies = (e) => {
    const val = e.target.value;
    if (1 <= val) {
      setCopies(val);
    }
  };

  /**
   * Handles the Ledger onChange event
   *
   * Mutates the ledger value in the state
   * @param {Object} o - {value:'ledger link', label:'Ledger Name'}
   */
  const handleChangeLedger = (o) => {
    const val = o.label;
    setLedger(val);
  };

  // ==================================================
  //              ELROND ESDT HANDLERS
  // ==================================================

  /**
   * Mutates the esdtName state
   * @param {Event} e the pointer to the caller
   */
  const onESDTNameChange = (e) => {
    const val = e.target.value;
    val ? setEsdtName(val) : setEsdtName("");
  };

  /**
   * Mutates the esdtCollectionName state
   * @param {Event} e the pointer to the caller
   */
  const onEsdtTickerChange = (e) => {
    const val = e.target.value;
    val ? setEsdtTicker(val.toUpperCase()) : setEsdtTicker("");
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };


  // ==================================================
  //              WEB3 HANDLERS
  // ==================================================

  const handleWeb3Click = async () => {

    setInactive(true);
    try {

      console.log("Create Item CLICK");
      console.log("chain", ledger);
      console.log("contract", CHAIN_INFO[ledger].contract);
      console.log("owner", web3MinterOwnerAccount);
      console.log("link", web3MinterAssetLInk);
      console.log("name", web3MinterNFTName);
      console.log("hash", web3MinterTokenID);
      console.log("data", `${ledger},${CHAIN_INFO[ledger].contract},${web3MinterOwnerAccount},${web3MinterTokenID}`);

      // await postCreateNFT({
      //   link: web3MinterAssetLInk,
      //   name: web3MinterNFTName,
      //   data: `${ledger},${CHAIN_INFO[ledger].contract},${web3MinterOwnerAccount},${web3MinterTokenID}`,
      //   hash: `${web3MinterTokenID}`
      // }, obj => {
      //   console.log(obj)
      // TODO: run the mintNFT to db:

      // })

      setSuccess("success");
    } catch (error) {
      console.error(error);
      setSuccess("failure");
    } finally {
      setTimeout(() => {
        setInactive(false);
      }, 3000);
    }


  }

  // ==================================================
  //                      J S X
  // ==================================================

  return (
    <div className="App">
      <header>
        <XPLogo />

        <XPSelect value={ledger} onChange={handleChangeLedger} />
      </header>

      {ledger && ledger === Ledgers[0].label ? (
        <PlokadotMintNftView
          inactive={inactive}
          success={success}
          onChange={handleChangeFiles}
          onClick={handleClickCreate}
          handleChangeTitle={handleChangeTitle}
          plokadoName={name}
          value={polkaAddress}
          onAccountChange={handlePolkaAccountChange}
          url={url}
          onChangeUrl={handleUrlChange}
        />
      ) : ledger && ledger === Ledgers[1].label ? (
        <ElrondMintNftView
          inactive={inactive}
          success={success}
          onChange={handleChangeFiles}
          onClick={handleClickCreate}
          estdIdentifier={esdt}
          handleChangeESDT={handleChangeESDT}
          elrondName={name}
          handleChangeTitle={handleChangeTitle}
          descrRows={descrRows}
          description={description}
          handleChangeDescription={handleChangeDescription}
          royalties={royalties}
          handleRoyaltiesChange={handleRoyaltiesChange}
          copies={copies}
          handleChangeCopies={handleChangeCopies}
          address={address}
          onAccountChange={handleAccountChange}
          url={url}
          onChangeUrl={handleUrlChange}
        />
      ) : ledger && ledger === Ledgers[2].label ? (
        <ESDTMint
          esdtName={esdtName}
          onESDTNameChange={onESDTNameChange}
          ticker={esdtTicker}
          onTickerChange={onEsdtTickerChange}
          onClick={handleClickCreate}
          inactive={inactive}
          success={success}
        />
      ) : (
        <XPWeb3MintView
          web3MinterTokenID={web3MinterTokenID}
          setWeb3MinterTokenID={setWeb3MinterTokenID}
          web3MinterOwnerAccount={web3MinterOwnerAccount}
          setWeb3MinterOwnerAccount={setWeb3MinterOwnerAccount}
          web3MinterNFTName={web3MinterNFTName}
          setWeb3MinterNFTName={setWeb3MinterNFTName}
          web3MinterAssetLInk={web3MinterAssetLInk}
          setWeb3MinterAssetLInk={setWeb3MinterAssetLInk}
          inactive={inactive}
          success={success}
          onClick={handleWeb3Click}
        />
      )}

      <footer></footer>
    </div>
  );
}

export default MinterView;
