import React, { useState, useRef } from 'react'
import ElrondLogo from '../assets/SVG/Elrond.js'
import SubstrateLogo from "../assets/SVG/substrateLogo.js";
import ChevronDown from '../assets/SVG/ShevronDown.js';
import {
    XPDropDown,
    XPWrapper,
    XPStyledText,
    XPDropDownContent,
    XPDropDownElement
} from './StyledComponents';

/**
 * Custom SELECT component
 * @param {String} value the default or selected option
 * @param {Array} data an Array || Object mapping user names to hashes
 * @param {Event} onClick click event handler
 * @param {Event} onChange change event handler
 * @returns the custom SELECT
 */
const Selector = ({ value, data, onClick, onChange, menuId }) => {

    const [display, setDisplay] = useState('none');
    const [borderRadius, setBorderRadius] = useState(6)


    //ref to close dropdown
    const closeDropDownRef = useRef(null);

    const borderRadiusHandler = () => display === "none" ? setBorderRadius(0) : setBorderRadius(6);

    /**
     * SELECT element onClick event handler
     * 
     * Swaps the dropdown menu visibility
     */
    const handleClick = () => {
        borderRadiusHandler();

        display === "none"
            ? setDisplay("block") 
            : setDisplay("none");

    }

    /**
     * Dropdown menu onClick event handler
     * 
     * Passes the element's value to the parent
     * @param {String} datum 
     */
    const handleXPDropDownClick = (datum) => {
        onChange(datum)
    }

    // DetectOutsideClick(closeDropDownRef, () => {
    //     console.log(closeDropDownRef);
    //     setTimeout(() => {
    //         if (display !== "none") {
    //             setBorderRadius(6)
    //             setDisplay('none')
    //         }
    //     }, 100)
    // }
    // );

    return (

        // ========================================================================================
        //                                  SELECT DropDown Top Window                            =
        // ========================================================================================

        <XPDropDown
            onClick={() => handleClick()}
            style={{ borderBottomRightRadius: borderRadius + "px", borderBottomLeftRadius: borderRadius + "px" }}
        >

            <XPWrapper>

                {/* ================================== 1. SVG ICON =================================*/}
                {
                    value && (value === data[1])
                        ? <ElrondLogo />
                        : <SubstrateLogo />
                }

                {/* ================================= 2. TEXT FIELD ================================*/}
                <XPStyledText>{value}</XPStyledText>

                {/* ================================ 3. Chevron Down ===============================*/}
                <ChevronDown />

            </XPWrapper>

            {/* ======================================================================================== */}
            {/*                               SELECT DropDown Menu                                       */}
            {/* ======================================================================================== */}

            <XPDropDownContent
                style={{ display }}
                className="dropdown"
                ref={closeDropDownRef}
                id={menuId}
            >
                {   // Loop over the data elements:
                    data.map((item, id) => {
                        return (
                            <XPDropDownElement key={id} onClick={() => handleXPDropDownClick(item)} >
                                <XPWrapper>
                                    {/* ================================== 1. SVG ICON =================================*/}
                                    {
                                        item && (item === data[1])
                                            ? <ElrondLogo />
                                            : <SubstrateLogo />
                                    }
                                    {/* ================================= 2. TEXT FIELD ================================*/}
                                    <XPStyledText>{item}</XPStyledText>
                                </XPWrapper>
                            </XPDropDownElement>
                        )
                    })
                }

            </XPDropDownContent>

        </XPDropDown>
    )
}


export default Selector;
