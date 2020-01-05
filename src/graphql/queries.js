import { gql } from '@apollo/client'

export const GET_POPULAR_MOVIES = gql`
  query getPopularMovies(
    $region: String = "US"
    $language: String = "en"
    $page: Int = 1
  ) {
    popularMovies(region: $region, language: $language, page: $page) {
      results {
        tmdbId
        title
        images {
          poster
          thumbnail
          logo
        }
      }
      pageInfo {
        page
        totalPages
        totalResults
      }
    }
  }
`

export const GET_SIMILAR_MOVIES = gql`
  query getSimilarMovies(
    $tmdbId: Int!
    $language: String = "en"
    $page: Int = 1
  ) {
    similarMovies(tmdbId: $tmdbId, language: $language, page: $page) {
      results {
        tmdbId
        title
        images {
          poster
          thumbnail
          logo
        }
      }
      pageInfo {
        page
        totalPages
        totalResults
      }
    }
  }
`

export const GET_POPULAR_TV_SHOWS = gql`
  query getPopularTvShows(
    $region: String = "US"
    $language: String = "en"
    $page: Int = 1
  ) {
    popularTvShows(region: $region, language: $language, page: $page) {
      results {
        tmdbId
        title
        images {
          poster
          thumbnail
          logo
        }
      }
      pageInfo {
        page
        totalPages
        totalResults
      }
    }
  }
`

export const GET_MOVIE_DETAILS = gql`
  query getMovieDetails(
    $tmdbId: Int!
    $language: String = "en"
    $region: String = "US"
  ) {
    movieDetails(tmdbId: $tmdbId, language: $language) {
      tmdbId
      title
      tagline
      overview
      runtime
      images {
        poster
        thumbnail
        logo
        backgrounds(limit: 1)
      }
      genres {
        name
      }
      credits {
        directors {
          id
          name
        }
        writers {
          id
          name
          job
        }
        cast {
          id
          name
          character
        }
      }
      primaryReleaseDate
      releaseDates(region: $region) {
        region
        results {
          releaseDate
          certification
          type
        }
      }
    }
  }
`
