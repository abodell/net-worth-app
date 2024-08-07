import Button from '@/components/Button';
import axios from 'axios';
import { usePlaidLink } from 'react-plaid-link';
import { useState, useEffect, useCallback } from 'react'
import PlaidAuth from '../components/PlaidAuth'
import { TypeAnimation } from 'react-type-animation';

const Layout = ({ children }) => {
    const [linkToken, setLinkToken] = useState();
    const [publicToken, setPublicToken] = useState();

    const onSuccess = useCallback(async (publicToken) => {
        setPublicToken(publicToken);
        const accessToken = await axios.post('/api/exchange-public-token', {public_token: publicToken});
    });

    useEffect( () => {
        async function fetch() {
            try {
                const response = await axios.post('/api/create-link-token');
                setLinkToken(response.data.link_token);
            } catch (err) {
                console.log(err)
            }
        }
        fetch()
    }, [])

    const {open, ready} = usePlaidLink({
        token: linkToken, 
        onSuccess
    });

    return (
        <div className="max-w-7xl mx-auto px-2 py-10 md:py-20">
        { /*
        - Look into connecting two accounts
        */}
            <div className="flex md:flex-col align-middle text-center gap-24 text-3xl font-semibold">
                <TypeAnimation
                sequence={[
                    'Track Your Growth',
                    1500,
                    'Keep Tabs on Your Net Worth',
                    1500,
                    'Find your path to Financial Freedom',
                    1500
                ]}
                speed={50}
                style={{ fontsize: '2em' }}
                deletionSpeed={70}
                repeat={Infinity}
                />
            </div>
            <div> {children} </div>
        </div>
    )
}

export default Layout