import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from 'next-themes'

import LoginModal from '@/components/modals/LoginModal'
import RegisterModal from '@/components/modals/RegisterModal'

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider defaultTheme="dark" attribute="class">
        <Toaster />
        <RegisterModal />
        <LoginModal />
          <Component {...pageProps} /> 
        </ThemeProvider>
    </SessionProvider>
  )
}
