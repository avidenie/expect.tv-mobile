import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { ScrollView } from 'react-native'
import { GET_POPULAR_MOVIES } from '../../graphql/queries'
import Slider from '../slider'

function Movies() {
  const navigation = useNavigation()
  return (
    <ScrollView>
      <Slider
        title="Most popular movies"
        subtitle="List updates daily"
        query={GET_POPULAR_MOVIES}
        contentKey="popularMovies"
        onPress={() => navigation.navigate('MovieDetails')}
      />
    </ScrollView>
  )
}

export default Movies
