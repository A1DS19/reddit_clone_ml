import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { AuthModalProvider } from 'context/authModalContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AuthModalProvider>
        <Component {...pageProps} />
      </AuthModalProvider>
    </ChakraProvider>
  );
}

export default MyApp;
