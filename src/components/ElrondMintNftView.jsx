
import { Address } from '@elrondnetwork/erdjs/out';
import React, { useState } from 'react';
import { useEffect } from 'react';
import Select from 'react-select';
import { ChainHandlers } from '../@utils/helper_functions';
import XPDropzone from './XPDropzone';

const dropStyle = {
    control: (base, state) => ({
        ...base,
        background: "#061A3C",
        padding: "6px",
        // match with the menu
        borderRadius: "6px",
        // Overwrittes the different states of border
        borderColor: state.isDisabled ? "red" : "#2E64B4",
        }),
    menu: (base) => ({
    ...base,
    // kill the gap
    marginTop: 0,
    color: "white",
    }),
    menuList: base => ({
    ...base,
    // kill the white space on first and last option
    padding: 0,
    background: "#061A3C",
    }),
    option: (base, state) => ({
      ...base,
      color: "white",
      background: state.isFocused || state.isSelected ? "darkblue" : base.background,
    }),
    singleValue: base => ({
        ...base,
        color: "white"
      })
};

const ElrondMintNftView = (props) => {
    const [esdts, setEsdts] = useState([]);

    useEffect(() => {
        (async () => {
            if (!props.address) {
                return;
            }

            try {
                new Address(props.address);
            } catch(_) {
                return;
            }

            const tokens = await ChainHandlers.elrondMintableNfts(props.address);
            if (tokens[0] === undefined) {
                return;
            }

            console.log(tokens[0]);

            setEsdts(tokens[0].map((v) => {
                return { value: v, label: v }
            }));
        })()
    }, [props.address]);

    return (
        <main>

            <h2>Create a collectible</h2>

            <div className="group-container">
                <div
                    className="bold-label"
                >ESDT Manager Address</div>
                <input
                    value={props.address}
                    onChange={e => props.onAccountChange(e)}
                    placeholder="" />
            </div>

            <div className="group-container">
                <div
                    className="bold-label"
                >ESDT Token</div>
                <Select
                    options={esdts}
                    isDisabled={esdts.length === 0}
                    onChange={props.handleChangeESDT}
                    defaultValue={ esdts.length > 0 && esdts[0] }
                    styles={dropStyle}
                />
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
                <div className="dotted-frame">
                    <XPDropzone
                        onChange={props.onChange}
                    />
                </div>
            </div>

            <div className="group-container">
                <button
                    disabled={esdts.length === 0}
                    onClick={props.onClick}
                    className="xp-button">Create item</button>
            </div>


        </main>
    )
}

export default ElrondMintNftView;