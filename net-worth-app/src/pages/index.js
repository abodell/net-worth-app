import axios from 'axios';
import LineChart from '@/components/LineChart';
import { usePlaidLink } from 'react-plaid-link';
import { useState, useEffect, useCallback, useRef } from 'react'
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

  const linkTokenFetched = useRef(false);

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
    async function getLinkToken() {
      if (!linkTokenFetched.current) {
        try {
          const response = await axios.post('/api/create-link-token');
          setLinkToken(response.data.link_token);
          linkTokenFetched.current = true
        } catch (err) {
          console.log(err.response);
        }
      }
    }
    getLinkToken();

    async function checkAccessToken() {
      if (currentUser) {
        setHasAccessToken(currentUser.hasAccessToken)
      }
    }
    checkAccessToken();

    async function saveUserAccountData() {
      // save net worth info to database
      if (currentUser && !localStorage.getItem('netWorthDataSaved', true)) {
        const res = await axios.post('/api/save-account-data', {
          id: currentUser.id
        });
        // need to figure out why this is getting called more than once (not priority)
        localStorage.setItem('netWorthDataSaved', 'true');
      }
    }
    saveUserAccountData();

    async function fetchUserAccountData() {
      if (currentUser) {
        const res = await axios.get('/api/get-account-data', {
          params: {id: currentUser.id}
        });
        setNetWorthData(res);
      }
    }
    fetchUserAccountData();
  }, [currentUser, linkToken]);

  const {open, ready} = usePlaidLink({
    token: linkToken, 
    onSuccess
  });
  // next thing to work on will be retrieving real user data and populating the chart with that if someone is signed in (priority)

  return (
    <>
    <Header />
    <Layout>
      {currentUser ? <h1 className="text-center text-xl font-semibold">Welcome, {currentUser.name}</h1> : null}
      {currentUser && hasAccessToken ?  <LineChart secondary={theme === "dark"}></LineChart> : currentUser ? <Button label="Connect your Bank Account" secondary={theme === 'dark'} onClick={open}/> : <LineChart secondary={theme === "dark"}></LineChart>}
    </Layout>
    </>
  );
}