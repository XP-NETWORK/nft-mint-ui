import React from "react";
import CreateButton from "./CreateButton";
import { CHAIN_INFO } from "../config";

const XPWeb3MintView = (props) => {
  return (
    <main>
      <h2>Create a collectible</h2>

      <div className="group-container">
        <div className="bold-label">Token ID</div>
        <input
          disabled={true}
          value={props.web3MinterTokenID}
          placeholder="Token ID"
        />
      </div>

      <div className="group-container">
        <div className="bold-label">Asset Name</div>
        <input
          value={props.web3MinterAssetName}
          onChange={(e) =>
            props.setWeb3MinterAssetName(
              e.target.value.replace(/(?:\r\n|\r|\n)/g, "")
            )
          }
          placeholder="(eg. Fight Punks)"
        />
      </div>

      <div className="group-container">
        <div className="bold-label">Asset Description</div>
        <input
          value={props.web3MinterAssetDescription}
          onChange={(e) =>
            props.setWeb3MinterAssetDescription(
              e.target.value.replace(/(?:\r\n|\r|\n)/g, "")
            )
          }
          placeholder="Describe your NFT"
        />
      </div>

      <div className="group-container">
        <div className="bold-label">Asset</div>
        <input
          value={props.web3MinterAssetBlob?.filename}
          onChange={(e) => {
            const file = e.target.files[0];
            // console.log();
            props.setWeb3MinterAssetBlob(file);
          }}
          placeholder="Account address"
          type="file"
          accept="image/*"
        />

        <div className="group-container">
          <CreateButton
            inactive={
              props.inactive || CHAIN_INFO[props.ledger].contract === undefined
            }
            onClick={props.onClick}
            state={props.success}
          />
        </div>

        <div className="group-container">
          <CreateButton
            inactive={
              props.inactive || CHAIN_INFO[props.ledger].contract !== undefined
            }
            onClick={props.onClickDeploy}
            state={props.success}
            caption="deploy"
          />
        </div>
      </div>
    </main>
  );
};

export default XPWeb3MintView;
