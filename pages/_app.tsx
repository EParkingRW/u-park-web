import '../styles/globals.css'
import type { AppProps } from 'next/app'
import AppProviders from '../modules/context/AppProviders'
import AuthProvider from "../modules/context/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
      <AuthProvider
          isProtected={pageProps.protected}
          guest={pageProps.allowedRoles}
          allowedRoles={pageProps.guest}
      >
        <AppProviders>
          <Component {...pageProps} />
        </AppProviders>
      </AuthProvider>

  )
}
