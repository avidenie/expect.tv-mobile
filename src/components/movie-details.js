import { useQuery } from '@apollo/client'
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import {
  ActivityIndicator,
  Chip,
  Divider,
  Headline,
  Text
} from 'react-native-paper'
import PosterCard from '../components/poster-card'
import { GET_MOVIE_DETAILS, GET_SIMILAR_MOVIES } from '../graphql/queries'
import Slider from './slider'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    padding: 32
  },
  error: {
    textAlign: 'center'
  },
  image: {
    width: '100%',
    aspectRatio: 16 / 9
  },
  detailsContainer: {
    padding: 16,
    flexDirection: 'row'
  },
  metadataContainer: {
    flex: 1,
    paddingLeft: 16
  },
  metadata: {
    paddingBottom: 16
  },
  categories: {
    marginBottom: 16
  },
  category: {
    marginRight: 8
  },
  description: {
    paddingHorizontal: 16,
    paddingBottom: 8
  },
  tagline: {
    fontStyle: 'italic',
    paddingBottom: 8
  }
})

function formatRuntime(runtime) {
  if (runtime < 60) {
    return `${runtime} min`
  }

  const hours = Math.floor(runtime / 60)
  const min = runtime - hours * 60

  if (min > 0) {
    return `${hours}h ${min}min`
  } else {
    return `${hours}h`
  }
}

function getCertification(releaseDates) {
  for (let i = 0, n = releaseDates.length; i <= n; i++) {
    const releaseDate = releaseDates[i].results.find(
      releaseDate => releaseDate.certification !== ''
    )
    if (releaseDate) {
      return releaseDate.certification
    }
  }
  return 'Unrated'
}

function MovieDetails({ navigation, route }) {
  const { tmdbId } = route.params
  const { loading, error, data } = useQuery(GET_MOVIE_DETAILS, {
    variables: {
      tmdbId: tmdbId
    }
  })

  // basic error handling
  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error.message}</Text>
      </View>
    )
  }

  // basic loading indicator
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    )
  }

  // set the header title
  navigation.setOptions({
    title: data.movieDetails.title
  })

  const [releaseYear] = data.movieDetails.primaryReleaseDate.split('-')
  const certification = getCertification(data.movieDetails.releaseDates)

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Image
        style={styles.image}
        source={{
          uri: data.movieDetails.images.backgrounds[0]
        }}
      />
      <View style={styles.detailsContainer}>
        <PosterCard item={data.movieDetails} width={100} />
        <View style={styles.metadataContainer}>
          <Headline style={styles.title}>{data.movieDetails.title}</Headline>
          <View style={styles.metadata}>
            <Text>
              {certification} • {releaseYear} •{' '}
              {formatRuntime(data.movieDetails.runtime)}
            </Text>
          </View>
          <View style={styles.creditsContainer}>
            <Text>
              <Text style={{ fontWeight: 'bold' }}>
                {data.movieDetails.credits.directors.length === 1
                  ? 'Director:'
                  : 'Directors:'}{' '}
              </Text>
              {data.movieDetails.credits.directors
                .map(director => director.name)
                .join(', ')}
            </Text>
          </View>
          <View style={styles.creditsContainer}>
            <Text>
              <Text style={{ fontWeight: 'bold' }}>
                {data.movieDetails.credits.writers.length === 1
                  ? 'Writer:'
                  : 'Writers:'}{' '}
              </Text>
              {data.movieDetails.credits.writers
                .map(writer => writer.name)
                .join(', ')}
            </Text>
          </View>
          <View style={styles.creditsContainer}>
            <Text>
              <Text style={{ fontWeight: 'bold' }}>Starring: </Text>
              {data.movieDetails.credits.cast
                .slice(0, 3)
                .map(cast => cast.name)
                .join(', ')}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.categories}>
        <Divider style={{ marginHorizontal: 16 }} />
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View
            style={{
              paddingVertical: 12,
              flexDirection: 'row',
              paddingHorizontal: 16
            }}>
            {data.movieDetails.genres.map(genre => (
              <Chip key={genre.name} style={styles.category} mode="outlined">
                {genre.name}
              </Chip>
            ))}
          </View>
        </ScrollView>
        <Divider style={{ marginHorizontal: 16 }} />
      </View>
      <View style={styles.description}>
        {data.movieDetails.tagline !== '' && (
          <Text style={styles.tagline}>{data.movieDetails.tagline}</Text>
        )}
        <Text>{data.movieDetails.overview}</Text>
      </View>
      <Slider
        title="Similar Movies"
        query={GET_SIMILAR_MOVIES}
        variables={{ tmdbId: data.movieDetails.tmdbId }}
        contentKey="similarMovies"
        style={{ paddingBottom: 16 }}
        onPress={tmdbId => () =>
          navigation.navigate('DiscoverMovieDetails', { tmdbId })}
      />
    </ScrollView>
  )
}

export default MovieDetails
