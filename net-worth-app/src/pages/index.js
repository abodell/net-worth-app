import axios from 'axios';
import { usePlaidLink } from 'react-plaid-link';
import { useState, useEffect, useCallback } from 'react'
import PlaidAuth from '../components/PlaidAuth'
import Header from '@/components/Header';
import Button from '@/components/Button';
import Layout from '@/components/Layout';
import { useTheme } from 'next-themes'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [linkToken, setLinkToken] = useState();
  const [publicToken, setPublicToken] = useState();
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  { /* create a component to house the plaid code */ }

  const onSuccess = useCallback(async (publicToken) => {
    setPublicToken(publicToken);
    const accessToken = await axios.post('/api/exchange-public-token', {public_token: publicToken});
  });

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
  }, []);

  const {open, ready} = usePlaidLink({
    token: linkToken, 
    onSuccess
  });

  return publicToken ? (<PlaidAuth publicToken={publicToken} />) : (
    <>
    <Header />
    <Layout />
    {mounted && <Button label="Connect your Bank Account" secondary={theme === 'dark'} onClick={open}/>}
    </>
  );
}
