import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache
} from '@apollo/client'
import { ThemeProvider } from 'emotion-theming'
import React from 'react'
import { AppRegistry } from 'react-native'
import { GRAPHQL_ENDPOINT_URI } from 'react-native-dotenv'
import { name as appName } from './app.json'
import App from './src/components/app'
import theme from './src/styles/theme.js'

const client = new ApolloClient({
  link: new HttpLink({
    uri: GRAPHQL_ENDPOINT_URI
  }),
  cache: new InMemoryCache()
})

const EnhancedApp = () => (
  <ThemeProvider theme={theme}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </ThemeProvider>
)

AppRegistry.registerComponent(appName, () => EnhancedApp)
