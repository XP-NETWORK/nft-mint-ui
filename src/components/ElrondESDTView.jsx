import React from 'react';
import CreateButton from './CreateButton';

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
                >ESDT Ticker</div>
                <input
                    value={props.ticker}
                    onChange={e => props.onTickerChange(e)}
                    placeholder="Enter your ESDT Ticker here" />
            </div>

            <div className="group-container">
            <div className="bold-label"></div>
            <CreateButton
                    inactive={props.inactive}
                    onClick={props.onClick}
                    state={props.success}
                    />
            </div>


        </main>
    )
}

export default ESDTMint;