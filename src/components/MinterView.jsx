import React, { useState } from 'react';
import { useWindowSize } from '../@utils/hooks';
import XPLogo from '../assets/SVG/XPLogo';
import XPSelect from './XPSelect';
import { Ledgers } from '../assets/data/ledgers';

import PlokadotMintNftView from './PolkadotMintNftView';
import ElrondMintNftView from './ElrondMintNftView';
import ESDTMint from './ElrondESDTView';


import { UnsignedPreset } from '../config';
import { ChainHandlers, post } from '../@utils/helper_functions';
import * as Elrond from "@elrondnetwork/dapp";
import * as Erdjs from '@elrondnetwork/erdjs/out';

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
  const [polkaAddress, setPolkaAddress] = useState('');

  // Common image blob storage
  const [blob, setBlob] = useState('');


  // ELROND STATE
  // ESDT token storage
  // address
  const [address, setAddress] = useState('');
  const [esdt, setEsdt] = useState('');
  // The name of the NFT
  const [name, setName] = useState('');
  // Min 0%, Max 50%
  const [royalties, setRoyalties] = useState(0);
  // Min 1, Max eternity
  const [copies, setCopies] = useState(1);
  // Max 140 characters
  const [description, setDescription] = useState('');
  // The number of rows to display the entire description
  const [descrRows, setDescrRows] = useState(1);

  const sendElrdTx = Elrond.useSendTransaction();


  // ELROND ESDT MINTING
  const [esdtName, setEsdtName] = useState('')
  const [esdtCollection, setEsdtCollection] = useState('')



  // ==================================================
  //                COMMON HANDLERS
  // ==================================================

  const handleChangeFiles = (files) => {
    if (files) {
      setBlob(files)
    }
  }

  const uploadImage = async () => {
    const formdat = new FormData();
    formdat.append("file", blob);
    formdat.append("upload_preset", UnsignedPreset)
    const res = await post("https://api.cloudinary.com/v1_1/xp-network/image/upload", formdat);
    return res[0].url;
  };

  const handleClickCreate = async () => {

    const url = await uploadImage();

    switch (ledger) {
      case Ledgers[0].label: {
        const polka = await ChainHandlers.polka();
        const signer = await ChainHandlers.polkadotSigner(polkaAddress);
        const encoder = new TextEncoder();
        console.log(encoder.encode(url));

        await polka.mintNft(signer, encoder.encode(url));
        break;
      }
      case Ledgers[1].label: {
        const elrd = await ChainHandlers.elrd();
        const txu = elrd.unsignedMintNftTxn(new Erdjs.Address(address), {
          identifier: esdt.toString(),
          quantity: parseInt(copies),
          name: name.toString(),
          royalties: parseInt(royalties),
          attrs: description.toString(),
          uris: [url]
        });

        sendElrdTx({
          transaction: txu,
          callbackRoute: "/processelrd"
        })
        break;
      }
      default:
        break;
    }

  }


  const handlePolkaAccountChange = (e) => {
    const val = e.target.value;
    val
      ? setPolkaAddress(val)
      : setPolkaAddress('')
  }

  // ==================================================
  //                ELROND HANDLERS
  // ==================================================


  const handleAccountChange = (e) => {
    const val = e.target.value;
    setAddress(val);
  }

  const handleChangeESDT = (e) => {
    const val = e.target.value;
    setEsdt(val);
    console.log(esdt)
  }


  /**
  * Handles the Description onChange event
  * 
  * Mutates the description value in the state
  * @param {Event} e the pointer to the event emitter
  */
  const handleChangeDescription = (e) => {
    const val = e.target.value;
    if (val.length < 141) {
      setDescription(val)

      const width = windowSise.width <= 600 ? windowSise.width : 600;

      if ((width - 40) < val.length * 6.6) {
        setDescrRows(Math.ceil((val.length * 6.6) / (width - 40)))
      }
    }

  }

  /**
 * Handles the Asset Name onChange event
 * 
 * Mutates the name value in the state
 * @param {Event} e the pointer to the event emitter
 */
  const handleChangeTitle = (e) => {
    const val = e.target.value;
    if (val) {
      setName(val)
    } else (
      setName('')
    )
  }

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
      setRoyalties(val)
    }
  }

  /**
    * Handles the Copies onChange event
    * 
    * Mutates the copies value in the state
    * @param {Event} e the pointer to the event emitter
    */
  const handleChangeCopies = (e) => {
    const val = e.target.value;
    if (1 <= val) {
      setCopies(val)
    }
  }

  /**
 * Handles the Ledger onChange event
 * 
 * Mutates the ledger value in the state
 * @param {Object} o - {value:'ledger link', label:'Ledger Name'}
 */
  const handleChangeLedger = (o) => {
    const val = o.label;
    setLedger(val);
  }

  // ==================================================
  //              ELROND ESDT HANDLERS
  // ==================================================


  /**
   * Mutates the esdtName state
   * @param {Event} e the pointer to the caller
   */
  const onESDTNameChange = (e) => {
    const val = e.target.value;
    val
      ? setEsdtName(val)
      : setEsdtName('')
  }

  /**
   * Mutates the esdtCollectionName state
   * @param {Event} e the pointer to the caller
   */
  const onEsdtCollectionChange = (e) => {
    const val = e.target.value;
    val
      ? setEsdtCollection(val)
      : setEsdtCollection('')
  }

  /**
   * Handles the ESDT form "CREATE" button click
   * 
   * Initiates the ESDT Minting transaction on Elrond
   */
  const handleClickESDTMint = () => {

    console.log('Check - ESDT Mint Click')

  }


  // ==================================================
  //                      J S X
  // ==================================================

  return (
    <div className="App">
      <header>
        <XPLogo />

        <XPSelect
          value={ledger}
          onChange={handleChangeLedger}
        />
      </header>

      {
        ledger && ledger === Ledgers[0].label
          ? (
            <PlokadotMintNftView
              onChange={handleChangeFiles}
              onClick={handleClickCreate}
              value={polkaAddress}
              onAccountChange={handlePolkaAccountChange}
            />)
          : ledger && ledger === Ledgers[1].label
            ? (
              <ElrondMintNftView

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
              />)
            : ledger && ledger === Ledgers[2].label
              ? <ESDTMint

                esdtName={esdtName}
                onESDTNameChange={onESDTNameChange}

                esdtCollection={esdtCollection}
                onEsdtCollectionChange={onEsdtCollectionChange}

                onClick={handleClickESDTMint}

              />
              : ('')
      }


      <footer>

      </footer>

    </div>
  );
}

export default MinterView;
