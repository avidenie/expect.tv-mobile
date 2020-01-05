import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { ScrollView } from 'react-native'
import { GET_POPULAR_TV_SHOWS } from '../../graphql/queries'
import Slider from '../slider'

function TvShows() {
  const navigation = useNavigation()
  return (
    <ScrollView>
      <Slider
        title="Most popular TV Shows"
        query={GET_POPULAR_TV_SHOWS}
        contentKey="popularTvShows"
        compact={true}
        onPress={tmdbId => () =>
          navigation.navigate('TvShowDetails', { tmdbId })}
      />
    </ScrollView>
  )
}

export default TvShows
