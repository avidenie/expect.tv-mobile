import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache
} from '@apollo/client'
import React from 'react'
import { AppRegistry } from 'react-native'
import { GRAPHQL_ENDPOINT_URI } from 'react-native-dotenv'
import 'react-native-gesture-handler'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { enableScreens } from 'react-native-screens'
import { name as appName } from './app.json'
import App from './src/components/app'

enableScreens()

const client = new ApolloClient({
  link: new HttpLink({
    uri: GRAPHQL_ENDPOINT_URI
  }),
  cache: new InMemoryCache()
})

function EnhancedApp() {
  return (
    <ApolloProvider client={client}>
      <PaperProvider theme={DefaultTheme}>
        <SafeAreaProvider>
          <App />
        </SafeAreaProvider>
      </PaperProvider>
    </ApolloProvider>
  )
}

AppRegistry.registerComponent(appName, () => EnhancedApp)
