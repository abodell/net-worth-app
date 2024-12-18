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
  const [netWorthData, setNetWorthData] = useState([]);
  /* 
  I need to check if the currentUser has an access token, if it does we render net worth / chart rather than the button
  */

  const linkTokenFetched = useRef(false);
  const isDarkMode = theme === 'dark'

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

    async function fetchUserAccountData() {
      if (currentUser) {
        const res = await axios.get('/api/get-account-data', {
          params: {id: currentUser.id}
        });
        setNetWorthData(res.data);
      }
    }
    fetchUserAccountData();
  }, [currentUser, linkToken]);

  const {open, ready} = usePlaidLink({
    token: linkToken, 
    onSuccess
  });

  const renderContent = () => {
    if (!currentUser) {
      return <LineChart secondary={isDarkMode} />
    }

    if (hasAccessToken) {
      return <LineChart secondary={isDarkMode} userData={netWorthData || []}/>
    }

    return (
      <Button
        label="Connect your Bank Account" 
        secondary={isDarkMode} 
        onClick={() => {
          if (linkToken && ready) open()
        }}
      />
    )
  }
  return (
    <>
    <Header />
    <Layout>
      {currentUser && (
        <h1 className="text-center text-xl font-semibold">
          Welcome, {currentUser.name}
        </h1>
      )}
      {renderContent()}
    </Layout>
    </>
  );
}