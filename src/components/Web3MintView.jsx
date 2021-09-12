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
                    value={props.web3MinterTokenID}
                    onChange={e => props.setWeb3MinterTokenID(e.target.value.replace(/(?:\r\n|\r|\n)/g, ''))}
                    placeholder="Token ID"
                />
            </div>

            <div className="group-container">
                <div className="bold-label">NFT Owner Account</div>
                <input
                    value={props.web3MinterOwnerAccount}
                    onChange={e => props.setWeb3MinterOwnerAccount(e.target.value.replace(/(?:\r\n|\r|\n)/g, ''))}
                    placeholder="Account address"
                />
            </div>

            <div className="group-container">
                <div className="bold-label">Asset Name</div>
                <input
                    value={props.web3MinterNFTName}
                    onChange={e => props.setWeb3MinterNFTName(e.target.value.replace(/(?:\r\n|\r|\n)/g, ''))}
                    placeholder="Account address"
                />
            </div>

            <div className="group-container">
                <div className="bold-label">Asset Link</div>
                <input
                    value={props.web3MinterAssetLInk}
                    onChange={e => props.setWeb3MinterAssetLInk(e.target.value.replace(/(?:\r\n|\r|\n)/g, ''))}
                    placeholder="Account address"
                />
            </div>

            <div className="group-container">
                <CreateButton
                    inactive={props.inactive || CHAIN_INFO[props.ledger].contract === undefined}
                    onClick={props.onClick}
                    state={props.success}
                />
            </div>

            <div className="group-container">
            <CreateButton
                inactive={props.inactive || CHAIN_INFO[props.ledger].contract !== undefined}
                onClick={props.onClickDeploy}
                state={props.success}
                caption="deploy"
            />
        </div>

        </main>
    )
};

export default XPWeb3MintView;