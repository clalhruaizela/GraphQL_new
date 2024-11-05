import { graphql } from "../../gql";

const GET_ANIME_BY_ID = graphql(`
  query getAnimeId($page: Int, $perPage: Int = 10, $format: MediaFormat) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }

      media(
        type: ANIME
        format: $format
        sort: TRENDING_DESC
        status: RELEASING
      ) {
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
        status
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
