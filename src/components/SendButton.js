import React from 'react'
import { XPButton, XPButtonText } from './StyledComponents'

/**
 * The button that triggers liquidity transfer
 * @param {Event} onClick param
 * @returns a JSX button
 */
const SendButton = ({ onClick, inactive, className }) => {

    const primary = "#045adb";
    const success = "#28a745";
    const danger = "#dc3545";
    const disabled = "#374462";

    return (
        <XPButton
            onClick={onClick}
            disabled={inactive}
            style={inactive
                ? (className
                    ? (className === 'success'
                        ? { "background": `${success}` }
                        : { "background": `${danger}` })
                    : { "background": `${disabled}` })
                : { "background": `${primary}` }
            }
        >
            <XPButtonText
                disabled={inactive}
            >
                {
                    inactive
                        ? (
                            className
                                ? (className === 'success'
                                    ? 'Success'
                                    : 'Failure')
                                : 'Executing'
                        )
                        : 'Send'
                }
            </XPButtonText>
        </XPButton>
    )
}

export default SendButton;