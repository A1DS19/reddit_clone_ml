import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { AuthModalProvider } from 'context/auth/authModalContext';
import { AuthProvider } from 'context/auth/authContext';
import React from 'react';
import { EvaluateSessionStatus } from '@/components/auth/EvaluateSessionStatus';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <AuthModalProvider>
          <EvaluateSessionStatus />
          <Component {...pageProps} />
        </AuthModalProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
