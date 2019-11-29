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
