import { gql, useQuery } from '@apollo/client'
import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import PortraitCard from '../components/portrait-card'
import useDimensions from '../hooks/dimensions'

const GET_POPULAR_MOVIES = gql`
  query getPopularMovies {
    popularMovies(region: "US", language: "en") {
      tmdbId
      title
      images {
        poster
        thumbnail
        logo
      }
    }
  }
`

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingLeft: 16,
    paddingRight: 16
  },
  separator: {
    width: 8
  }
})

const PopularMovies = () => {
  const { loading, error, data } = useQuery(GET_POPULAR_MOVIES)
  const { width: screenWidth } = useDimensions().screen
  const columns = screenWidth >= 600 ? 6 : 3
  const columnWidth = (screenWidth - 32 - (columns - 1) * 8) / columns

  if (loading) {
    return <Text>Loading...</Text>
  }

  if (error) {
    return <Text>Error! {error.message}</Text>
  }

  return (
    <FlatList
      contentContainerStyle={styles.contentContainerStyle}
      data={data.popularMovies}
      horizontal={true}
      initialNumToRender={columns + 1}
      keyExtractor={item => item.tmdbId.toString()}
      renderItem={({ item }) => (
        <PortraitCard item={item} width={columnWidth} />
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      showsHorizontalScrollIndicator={false}
    />
  )
}

export default PopularMovies
