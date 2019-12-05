import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache
} from '@apollo/client'
import React from 'react'
import { AppRegistry } from 'react-native'
import { GRAPHQL_ENDPOINT_URI } from 'react-native-dotenv'
import { name as appName } from './app.json'
import App from './src/components/app'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors
  },
}

const client = new ApolloClient({
  link: new HttpLink({
    uri: GRAPHQL_ENDPOINT_URI
  }),
  cache: new InMemoryCache()
})

const EnhancedApp = () => (
  <PaperProvider theme={theme}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </PaperProvider>
)

AppRegistry.registerComponent(appName, () => EnhancedApp)
