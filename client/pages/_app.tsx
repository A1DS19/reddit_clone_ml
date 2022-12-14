import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { AuthModalProvider } from 'context/auth/authModalContext';
import { AuthProvider } from 'context/auth/authContext';
import React from 'react';
import { EvaluateSessionStatus } from '@/components/auth/EvaluateSessionStatus';
import { CommunitiesProvider } from 'context/communities/communitiesContext';
import { Header } from '@/components/header/Header';
import { PostsProvider } from 'context/posts/postsContext';
import { Footer } from '@/components/Footer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <CommunitiesProvider>
          <AuthModalProvider>
            <PostsProvider>
              <EvaluateSessionStatus />
              <header>
                <Header />
              </header>
              <div className='bg-gray-300 min-h-screen'>
                <Component {...pageProps} />
              </div>
              <footer>
                <Footer />
              </footer>
            </PostsProvider>
          </AuthModalProvider>
        </CommunitiesProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
