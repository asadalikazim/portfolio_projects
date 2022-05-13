import '../styles/globals.css'
import type { AppProps } from 'next/app'
import theme from '../theme/theme';

import { ChakraProvider } from '@chakra-ui/react'
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apollo-client";

function MyApp({ Component, pageProps }:AppProps) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  )
}

export default MyApp