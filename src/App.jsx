import React, { useState } from 'react';
import { useWindowSize } from './@utils/hooks';
import XPLogo from './assets/SVG/XPLogo';
import XPSelect from './components/XPSelect';
import { Ledgers } from './assets/data/ledgers';

import PlokadotMintNftView from './components/PolkadotMintNftView';
import ElrondMintNftView from './components/ElrondMintNftView';

/**
 * 
 * @returns the JSX of the application
 */
function App() {

  // Hook to extract the size of the window
  const windowSise = useWindowSize();


  // ==============================================================
  //                            S T A T E
  // ==============================================================

  const [ledger, setLedger] = useState(Ledgers[0].label);

  // Common image blob storage
  const [blob, setBlob] = useState('');

  // POLKADOT 
  // address
  const [polkaAddress, setPolkaAddress] = useState('');

  // ELROND
  // ESDT token storage
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
  // Link to the resource
  const [uri, setUri] = useState('');

 

  // ==================================================
  //                COMMON HANDLERS
  // ==================================================

  const handleChangeFiles = (files) => {
    if (files) {
      setBlob(files)
    }

  }

  const handleClickCreate = () => {

    switch(ledger){
      case Ledgers[0].label:
        console.log(ledger, name, description, royalties, copies, uri, blob)
        break;
      case Ledgers[1].label:
        console.log(ledger, name, description, royalties, copies, uri, blob)
        break;
      default:
        break;
    }

  }

  // ==================================================
  //                POLKADOT HANDLERS
  // ==================================================

  const handlePolkadotAccountChange = (e) => {
    const val = e.target.value;
    setPolkaAddress(val);
  }

  // ==================================================
  //                ELROND HANDLERS
  // ==================================================

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
  
    const handleChangeUri = (e) => {
      const val = e.target.value;
  
      if (val) {
        setUri(val)
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
    console.log(ledger)
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
              onAccountChange={handlePolkadotAccountChange}
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

                uri={uri}
                handleChangeUri={handleChangeUri}
              />)
            : ('')
      }


      <footer>

      </footer>

    </div>
  );
}

export default App;
