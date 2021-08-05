const stateColors = {
    'success': '#28a745',
    'failure': '#dc3545',
    'disabled': '#374462',
    'enabled': '#045adb'
};

const stateText = {
    'success': 'Success',
    'failure': 'Failure',
    'disabled': 'Executing',
    'enabled': 'Create Item'
}

const CreateButton = ({ onClick, inactive, state }) => {

    const stateS = inactive ? state || 'disabled' : 'enabled';

    const styles = {

        button: {
            color: 'white',
            padding: '15px',
            width: '100%',
            opacity: '0.9',
            border: '0px solid #045ADB',
            borderRadius: '6px',
            userSelect: 'none',
            cursor: 'pointer',
            background: `${stateColors[stateS]}`
        },
        
        text: {
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '126%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            letterSpacing: '0.03em',
            color: 'white',
            ":disabled": {
                color: '#AAA'
            }
        }
    }

    return (
        <button
            onClick={onClick}
            disabled={inactive}
            style={styles.button}
        >
            <div
                style={styles.text}
                disabled={inactive}
            >
                {stateText[stateS]}
            </div>
        </button>
    )
}

export default CreateButton;