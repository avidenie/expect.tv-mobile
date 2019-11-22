import { gql } from '@apollo/client'

export const GET_POPULAR_MOVIES = gql`
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

export const GET_POPULAR_TV_SHOWS = gql`
  query getPopularTvShows {
    popularTvShows(region: "US", language: "en") {
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
