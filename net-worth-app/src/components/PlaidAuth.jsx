import {useEffect, useState} from 'react';
import axios from 'axios';

function PlaidAuth( { publicToken } ) {
    const [account, setAccount] = useState();

    useEffect( () => {
        async function fetchData() {
            const accessToken = await axios.post('/api/exchange-public-token', {public_token: publicToken});
            const auth = await axios.post('/api/plaid-auth', {access_token: accessToken.data.access_token});
            setAccount(auth.data.numbers.ach[0]);
        }
        fetchData();
    }, [publicToken]);

    return account && 
        <>
            <p>Account number: {account.account}</p>
            <p>Routing number: {account.routing}</p>
        </>
}

export default PlaidAuth;