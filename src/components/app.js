import React from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import Slider from '../components/slider'
import { GET_POPULAR_MOVIES, GET_POPULAR_TV_SHOWS } from '../graphql/queries'

const App = () => (
  <SafeAreaView>
    <ScrollView>
      <Slider
        title="Most popular movies"
        subtitle="List updates daily"
        query={GET_POPULAR_MOVIES}
        contentKey="popularMovies"
      />
      <Slider
        title="Most popular TV Shows"
        query={GET_POPULAR_TV_SHOWS}
        contentKey="popularTvShows"
        compact={true}
      />
    </ScrollView>
  </SafeAreaView>
)

export default App
