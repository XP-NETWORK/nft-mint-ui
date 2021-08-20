import React from 'react';
import CreateButton from './CreateButton';
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
				<div className="bold-label">
					URI
				</div>
				<input
					value={props.url}
					onChange={e => props.onChangeUrl(e)}
					placeholder=""
				/>
			</div>

            <div className="group-container">

                    <CreateButton
                    inactive={props.inactive}
                    onClick={props.onClick}
                    state={props.success}
                    />
            </div>


        </main>
    )
}

export default PlokadotMintNftView;
