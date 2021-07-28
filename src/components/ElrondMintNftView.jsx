
import React from 'react';
import XPDropzone from './XPDropzone';

const ElrondMintNftView = (props) => {


    return (
        <main>

            <h2>Create a collectible</h2>

            <div className="group-container">
                <div
                    className="bold-label"
                >ESDT Identifier</div>
                <input
                    value={props.estdIdentifier}
                    onChange={props.handleChangeESDT}
                    placeholder="" />
            </div>

            <div className="group-container">
                <div
                    className="bold-label"
                >Collectible Name</div>
                <input
                    value={props.elrondName}
                    onChange={props.handleChangeTitle}
                    placeholder="" />
            </div>

            <div className="group-container">
                <div className="bold-label">Attributes</div>
                <textarea
                    rows={props.descrRows}
                    value={props.description}
                    onChange={props.handleChangeDescription}
                    placeholder="Arbitrary field, 140 characters max."
                />
            </div>

            <div className="row-container">
                <span>
                    <span className="bold-label">Royalties</span>
                    <input
                        className="half-input"
                        type="number"
                        value={props.royalties}
                        onChange={props.handleRoyaltiesChange}
                        placeholder="Maximum 50%" />
                </span>
                <span className="elt-divider"></span>
                <span>
                    <span className="bold-label">Copies</span>
                    <input
                        className="half-input"
                        type="number"
                        value={props.copies}
                        onChange={props.handleChangeCopies}
                        placeholder="Amount of tokens"
                    />
                </span>
            </div>

            <div className="group-container">
                <div
                    className="bold-label"
                >URI</div>
                <input
                    className="bold-label"
                    value={props.uri}
                    onChange={props.handleChangeUri}
                    placeholder="https://link.to.nft" />
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

export default ElrondMintNftView;