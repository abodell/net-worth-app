import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'

import LoginModal from '@/components/modals/LoginModal'
import RegisterModal from '@/components/modals/RegisterModal'

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
    <Toaster />
    <RegisterModal />
    <LoginModal />
      <Component {...pageProps} /> 
    </SessionProvider>
  )
}
