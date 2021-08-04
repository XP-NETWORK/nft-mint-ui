import React from 'react';

const ESDTMint = (props) => {


    return (
        <main>

            <h2>Create an ESDT</h2>

            <div className="group-container">
                <div
                    className="bold-label"
                >ESDT Name</div>
                <input
                    value={props.esdtName}
                    onChange={e => props.onESDTNameChange(e)}
                    placeholder="Type your ESDT name here" />
            </div>

            <div className="group-container">
                <div
                    className="bold-label"
                >ESDT Collection</div>
                <input
                    value={props.esdtCollection}
                    onChange={e => props.onEsdtCollectionChange(e)}
                    placeholder="Name your NFT collection" />
            </div>

            <div className="group-container">
            <div className="bold-label"></div>
                <button
                    onClick={props.onClick}
                    className="xp-button">Create ESDT</button>
            </div>


        </main>
    )
}

export default ESDTMint;