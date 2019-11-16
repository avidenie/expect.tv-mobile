import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache
} from '@apollo/client'
import React from 'react'
import { AppRegistry } from 'react-native'
import { name as appName } from './app.json'
import App from './src/components/app'
import { ThemeProvider } from 'emotion-theming'
import theme from './src/styles/theme.js'

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://expect-tv-server.herokuapp.com'
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
