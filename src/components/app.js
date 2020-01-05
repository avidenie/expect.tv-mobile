import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { NavigationNativeContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { StatusBar, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MovieDetails from './movie-details'
import Discover from './tabs/discover'
import Movies from './tabs/movies'
import TvShows from './tabs/tv-shows'
import TvShowDetails from './tv-show-details'
import { overlay } from 'react-native-paper'

function getBackgroundColor(theme) {
  return theme.dark ? overlay(4, theme.colors.surface) : theme.colors.surface
}

function getScreenOptions(theme) {
  return {
    headerTitleStyle: {
      color: theme.colors.text
    },
    headerStyle: {
      backgroundColor: getBackgroundColor(theme)
    },
    headerBackTitleStyle: {
      color: theme.colors.text
    },
    headerTintColor: theme.colors.text,
    cardStyle: {
      backgroundColor: theme.colors.background
    }
  }
}

const DiscoverStack = createStackNavigator()
function DiscoverTab() {
  const theme = useTheme()
  return (
    <DiscoverStack.Navigator screenOptions={getScreenOptions(theme)}>
      <DiscoverStack.Screen
        name="Discover"
        component={Discover}
        options={{
          title: 'Discover'
        }}
      />
      <DiscoverStack.Screen
        name="DiscoverMovieDetails"
        component={MovieDetails}
        options={{
          title: ''
        }}
      />
      <DiscoverStack.Screen
        name="DiscoverTvShowDetails"
        component={TvShowDetails}
        options={{
          title: 'TV Show Details'
        }}
      />
    </DiscoverStack.Navigator>
  )
}

const MoviesStack = createStackNavigator()
function MoviesTab() {
  const theme = useTheme()
  return (
    <MoviesStack.Navigator screenOptions={getScreenOptions(theme)}>
      <MoviesStack.Screen
        name="Movies"
        component={Movies}
        options={{
          title: 'Movies'
        }}
      />
      <MoviesStack.Screen
        name="MovieDetails"
        component={MovieDetails}
        options={{
          title: 'Movie Details'
        }}
      />
    </MoviesStack.Navigator>
  )
}

const TvShowStack = createStackNavigator()
function TvShowTab() {
  const theme = useTheme()
  return (
    <TvShowStack.Navigator screenOptions={getScreenOptions(theme)}>
      <TvShowStack.Screen
        name="TvShows"
        component={TvShows}
        options={{
          title: 'TV Shows'
        }}
      />
      <TvShowStack.Screen
        name="TvShowDetails"
        component={TvShowDetails}
        options={{
          title: 'TV Show Details'
        }}
      />
    </TvShowStack.Navigator>
  )
}

const Tab = createMaterialBottomTabNavigator()
function BottomTabs() {
  const theme = useTheme()
  return (
    <Tab.Navigator
      barStyle={{
        backgroundColor: getBackgroundColor(theme)
      }}>
      <Tab.Screen
        name="Discover"
        component={DiscoverTab}
        options={{
          tabBarLabel: 'Discover',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="compass-outline"
              size={24}
              style={{ color: color }}
            />
          )
        }}
      />
      <Tab.Screen
        name="Movies"
        component={MoviesTab}
        options={{
          tabBarLabel: 'Movies',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="movie-outline"
              size={24}
              style={{ color: color }}
            />
          )
        }}
      />
      <Tab.Screen
        name="TVShows"
        component={TvShowTab}
        options={{
          tabBarLabel: 'TV Shows',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="youtube-tv"
              size={24}
              style={{ color: color }}
            />
          )
        }}
      />
    </Tab.Navigator>
  )
}

const Stack = createStackNavigator()
function RootStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={BottomTabs} />
    </Stack.Navigator>
  )
}

function App() {
  const theme = useTheme()
  return (
    <NavigationNativeContainer>
      <StatusBar
        backgroundColor={getBackgroundColor(theme)}
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <RootStack />
    </NavigationNativeContainer>
  )
}

export default App
