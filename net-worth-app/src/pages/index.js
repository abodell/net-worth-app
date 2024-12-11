import axios from 'axios';
import LineChart from '@/components/LineChart';
import { usePlaidLink } from 'react-plaid-link';
import { useState, useEffect, useCallback } from 'react'
import PlaidAuth from '../components/PlaidAuth'
import Header from '@/components/Header';
import Button from '@/components/Button';
import Layout from '@/components/Layout';
import useCurrentUser from '@/hooks/useCurrentUser';
import { useTheme } from 'next-themes'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [linkToken, setLinkToken] = useState();
  const [publicToken, setPublicToken] = useState();
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { data: currentUser } = useCurrentUser();
  const [hasAccessToken, setHasAccessToken] = useState(false)
  const [netWorthData, setNetWorthData] = useState(null);
  /* 
  I need to check if the currentUser has an access token, if it does we render net worth / chart rather than the button
  */

  const onSuccess = useCallback(async (publicToken) => {
    try {
      setPublicToken(publicToken);
      const accessToken = await axios.post('/api/exchange-public-token', {public_token: publicToken});

      const data = await axios.post('/api/plaid-auth', {
        access_token: accessToken.data.access_token,
      });
      // save the access token when the user connects
      await axios.put('/api/save-access-token', {
        access_token: accessToken.data.access_token,
        user_id: currentUser.id
      })

    }
    catch (error) {
      console.error(error)
    }
  }, [currentUser]);

  useEffect( () => {
    setMounted(true)
    async function fetch() {
      try {
        const response = await axios.post('/api/create-link-token');
        setLinkToken(response.data.link_token);
      } catch (err) {
        console.log(err.response);
      }
    }
    fetch();

    async function checkAccessToken() {
      if (currentUser) {
        setHasAccessToken(currentUser.hasAccessToken)
      }
    }
    checkAccessToken();

    async function saveUserAccountData() {
      // save net worth info to database
      if (currentUser) {
        const res = await axios.post('/api/save-account-data', {
          id: currentUser.id
        });
        console.log(res)
      }
    }
    saveUserAccountData();
  }, [currentUser]);

  const {open, ready} = usePlaidLink({
    token: linkToken, 
    onSuccess
  });

  return (
    <>
    <Header />
    <Layout>
      {currentUser ? <h1 className="text-center text-xl font-semibold">Welcome, {currentUser.name}</h1> : null}
      {currentUser && hasAccessToken ?  <LineChart secondary={theme === "dark"}></LineChart> : <Button label="Connect your Bank Account" secondary={theme === 'dark'} onClick={open}/>}
    </Layout>
    </>
  );
}
