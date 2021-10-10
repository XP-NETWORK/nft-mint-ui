import React, { useEffect, useState } from "react";
import { useWindowSize } from "../@utils/hooks";
import XPLogo from "../assets/SVG/XPLogo";
import XPSelect from "./XPSelect";
import { Ledgers } from "../assets/data/ledgers";
import ElrondMintNftView from "./ElrondMintNftView";
import XPWeb3MintView from "./Web3MintView";

import { NFTStorage } from "nft.storage";
import ESDTMint from "./ElrondESDTView";

import { CHAIN_INFO, TronAccs } from "../config";
import {
  ChainFactory,
  mintWeb3NFT,
  Web3Helper,
  TronHelper,
  ElrondHelper,
} from "../@utils/helper_functions";
import { Address, ExtensionProvider } from "@elrondnetwork/erdjs/out";

const uploadToIpfs = async (name, description, file) => {
  const endpoint = "https://api.nft.storage";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDI5NjBBNTgxOWYyZDRmMzE0NWE4NjBhMGVCZTdGRTc0NGREOTBkRTciLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYzMjgyMDczMjA0MywibmFtZSI6IlRlc3RpbmdLZXkifQ.AyWHqtG3vRe_UUx0ht4EOv7sxbVPGD0ZmxQ6UD8BrKA";
  const storage = new NFTStorage({ endpoint, token });
  console.log("Create Item CLICK");
  return await storage.store({
    name: name,
    description: description,
    image: file,
    attributes: [
      {
        display_type: "date",
        trait_type: "birthday",
        value: Math.round(new Date().getTime() / 1000), // Value must be a unix timestamp.
      },
    ],
  });
};

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

  const updateTokenId = (ledg) => {
    if (ledg === "Elrond" || ledg === "ESDT") {
      return;
    }
    if (ledg === "Tron") {
      TronHelper()
        .getTokenId()
        .then((e) => {
          setWeb3MinterTokenID(e);
        });
      return;
    }
    Web3Helper()
      .getTokenId(ledg)
      .then((e) => {
        setWeb3MinterTokenID(e);
      });
  };

  useEffect(() => {
    if (ledger === "" || ledger === Ledgers[1].label) {
      return;
    }
    updateTokenId(ledger);
  }, [ledger]);

  useEffect(() => {
    if (ledger === "Elrond" || ledger === "ESDT") {
      ElrondHelper()
        .listAccounts()
        .then((a) => {
          setSelectedAccount(a);
          setAddress(a);
        });
      return;
    }
    if (!ChainFactory[ledger]) {
      if (ledger === "Tron") {
        TronHelper()
          .listAccounts()
          .then((a) => {
            setSelectedAccount(a);
          });
        return;
      }
      ChainFactory.Web3.setWeb3Chain(ledger).then(() => {
        ChainFactory.Web3.listAccounts().then((a) => {
          setSelectedAccount(a[0]);
        });
      });
    }
  }, [ledger]);

  // Common image blob storage
  const [, setBlob] = useState("");
  const [success, setSuccess] = useState("");
  const [inactive, setInactive] = useState(false);
  const [file, setFile] = useState(null);

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

  // ELROND ESDT MINTING
  const [esdtName, setEsdtName] = useState("");
  const [esdtTicker, setEsdtTicker] = useState("");

  // WEB3 COMPATIBLE (BSC, Ethereum, HECO)
  const [web3MinterTokenID, setWeb3MinterTokenID] = useState("");
  const [web3MinterAssetName, setWeb3MinterAssetName] = useState("");
  const [web3MinterAssetDescription, setWeb3MinterAssetDescription] = useState(
    ""
  );
  const [web3MinterAssetBlob, setWeb3MinterAssetBlob] = useState(null);

  // ==================================================
  //                COMMON HANDLERS
  // ==================================================

  const handleChangeFiles = (files) => {
    if (files) {
      setBlob(files);
    }
  };

  const handleClickCreate = async () => {
    setInactive(true);
    try {
      switch (ledger) {
        case Ledgers[0].label: {
          const elrond = await ChainFactory["Elrond"];
          const metadata = await uploadToIpfs(name, description, file);
          await elrond.mintElrondNft(
            esdt,
            copies,
            name,
            royalties,
            undefined,
            description,
            metadata.url
          );
          console.log("RESULT - SUCCESS ");
          setSuccess("success");
          break;
        }
        case Ledgers[1].label: {
          const elrd = await ChainFactory["Elrond"].inner();
          const ticker = await elrd.issueESDTNft(
            ExtensionProvider.getInstance(),
            esdtName,
            esdtTicker,
            false,
            false,
            true
          );

          await elrd.setESDTRole(
            ExtensionProvider.getInstance(),
            ticker,
            new Address(address),
            Array.of("ESDTRoleNFTCreate")
          );
          console.log("RESULT - SUCCESS");
          setSuccess("success");
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

  // ==================================================
  //              WEB3 HANDLERS
  // ==================================================

  const handleWeb3Click = async () => {
    setInactive(true);
    try {
      console.log("Create Item CLICK");
      const metadata = await uploadToIpfs(
        web3MinterAssetName,
        setWeb3MinterAssetDescription,
        web3MinterAssetBlob
      );
      const result = await mintWeb3NFT(ledger, selectedAccount, metadata.url);
      console.log("Metadata Url:", metadata.url, "result", result);
      updateTokenId(ledger);
      setSuccess("success");
      // await incrementTokenId();
    } catch (error) {
      console.error(error);
      setSuccess("failure");
    } finally {
      setTimeout(() => {
        setInactive(false);
      }, 3000);
    }
  };

  const onClickDeploy = async () => {
    const inner = await ChainFactory[ledger].inner();

    CHAIN_INFO[ledger].contract_owner = TronAccs.ACC1.key;
    CHAIN_INFO[ledger].contract = await inner.deployErc1155(TronAccs.ACC1.key);
    console.log("minter: ", CHAIN_INFO[ledger].contract);
  };
  const [selectedAccount, setSelectedAccount] = useState("");
  useEffect(() => {
    (async () => {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setSelectedAccount(accounts[0]);
    })();
    window.ethereum.on("accountsChanged", (a) => {
      setSelectedAccount(a[0]);
    });
    window.ethereum.on("chainChanged", (a) => {
      window.location.reload();
    });
  }, []);

  // ==================================================
  //                      J S X
  // ==================================================

  return (
    <div className="App">
      <header>
        <XPLogo />
        <XPSelect value={ledger} onChange={handleChangeLedger} />
      </header>
      <p>Using account: {selectedAccount} </p>
      {ledger && ledger === Ledgers[0].label ? (
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
          file={file}
          onChangeFile={setFile}
        />
      ) : ledger && ledger === Ledgers[1].label ? (
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
          web3MinterAssetName={web3MinterAssetName}
          setWeb3MinterAssetName={setWeb3MinterAssetName}
          web3MinterAssetDescription={web3MinterAssetDescription}
          setWeb3MinterAssetDescription={setWeb3MinterAssetDescription}
          web3MinterAssetBlob={web3MinterAssetBlob}
          setWeb3MinterAssetBlob={setWeb3MinterAssetBlob}
          inactive={inactive}
          success={success}
          onClick={handleWeb3Click}
          onClickDeploy={onClickDeploy}
          ledger={ledger}
        />
      )}
      <footer></footer>
    </div>
  );
}

export default MinterView;
