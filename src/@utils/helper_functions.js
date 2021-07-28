

/**
 * POST request helper function
 * @param {String} route 
 * @param {Object} data 
 * @returns Success confirmation || Error message
 */
export async function post(route, data) {

    try {
        // Convert the JS Object into a string:
        const body = JSON.stringify(data);

        let err;
        // Save the result of the POST request
        const resp = await fetch(route,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body
            })
            .catch((e) => err = e);

        // On error -> print it in the console
        err && console.log(err);

        // Return the JSON formatted response
        return [await resp.json(), err];
    } catch (error) {
        // On error -> print it in the console
        console.error(error);
        // Retur the text of the error
        return [{}, error];
    }

}

/**
 * Maps the data to the required keys
 * @param {String} addr the address of origin
 * @param {String} key the signature key
 * @param {String} dest the target address
 * @param {String | Number} val the amount
 * @returns a JS Object required by the BE
 */
export function polkadot_req_data(addr, key, dest, val) {
    return {
        "sender_addr": addr,
        "sender_key": key,
        "destination": dest,
        "value": val
    }
}

/**
 * Maps the data to the required keys
 * @param {String} pem the key 
 * @param {String} dest the target address
 * @param {String | Number} val the amount
 * @returns a JS Object required by the BE
 */
export function elrd_req_data(pem, dest, val) {
    return {
        "pem": pem,
        "destination": dest,
        "value": val
    }
}

