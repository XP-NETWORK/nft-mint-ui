import React from 'react';
import XPDropzone from './XPDropzone';

const PlokadotMintNftView = (props) => {


    return (
        <main>

            <h2>Create a collectible</h2>

            <div className="group-container">
                <div
                    className="bold-label"
                >Minter Account</div>
                <input
                    value={props.value}
                    onChange={e => props.onAccountChange(e)}
                    placeholder="" />
            </div>

            <div className="group-container">
                <div className="dotted-frame">
                    <XPDropzone 
                        onChange={props.onChange}
                    />
                </div>
            </div>

            <div className="group-container">
                <button
                    onClick={props.onClick}
                    className="xp-button">Create item</button>
            </div>


        </main>
    )
}

export default PlokadotMintNftView;