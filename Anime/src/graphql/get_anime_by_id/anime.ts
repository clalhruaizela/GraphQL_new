import { graphql } from "../../gql";

const GET_ANIME_BY_ID = graphql(`
  query getAnimeId(
    $search: String
    $page: Int
    $perPage: Int = 10
    $format: MediaFormat
  ) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }

      media(search: $search, type: ANIME, format: $format) {
        id
        coverImage {
          extraLarge
          large
          medium
          color
        }
        title {
          english
        }
        format
        duration
        genres
        season
        episodes
        description
      }
    }
  }
`);

export default GET_ANIME_BY_ID;
