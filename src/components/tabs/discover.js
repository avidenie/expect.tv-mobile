import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { GET_POPULAR_MOVIES, GET_POPULAR_TV_SHOWS } from '../../graphql/queries'
import Slider from '../slider'

const styles = StyleSheet.create({
  divider: {
    height: 20
  }
})

function Discover() {
  const navigation = useNavigation()
  return (
    <ScrollView>
      <Slider
        title="Most popular movies"
        subtitle="List updates daily"
        query={GET_POPULAR_MOVIES}
        contentKey="popularMovies"
        onPress={tmdbId => () =>
          navigation.navigate('DiscoverMovieDetails', { tmdbId })}
      />
      <View style={styles.divider} />
      <Slider
        title="Most popular TV Shows"
        query={GET_POPULAR_TV_SHOWS}
        contentKey="popularTvShows"
        compact={true}
        onPress={tmdbId => () =>
          navigation.navigate('DiscoverTvShowDetails', { tmdbId })}
      />
    </ScrollView>
  )
}

export default Discover
