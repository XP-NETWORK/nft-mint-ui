import { TransactionHash } from '@elrondnetwork/erdjs';
import React, { useState, useRef } from 'react';
import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { ChainHandlers } from '../@utils/helper_functions';

function ElrondTxnHandler() {
    const history = useRef(useHistory());
    const query = useRef(new URLSearchParams(useLocation().search));
    const status = useRef(query.current.get("status"));

    const [txState, setTxState] = useState(status.current === "success" ? 'processing... please wait!' : 'failed to execute txn!');

    const execTx = async () => {
        const elrd = await ChainHandlers.elrd();
        await elrd.handleTxnEvent(new TransactionHash(query.current.get("txHash")));
        setTxState("Done!");
    };

    useEffect(() => {
        const cb = status.current === "success" ? execTx() : new Promise((r) => r());
        cb.then(async () => {
            await new Promise(r => setTimeout(r, 3000));
            history.current.push("/");
        })
    }, [])

    return (
        <div>
            <p>
                {txState}
            </p>
        </div>
    )
}

export default ElrondTxnHandler;