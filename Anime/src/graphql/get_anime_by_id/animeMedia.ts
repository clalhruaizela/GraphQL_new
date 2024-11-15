import { graphql } from "../../gql";

const GET_ANIME_BY_ID = graphql(`
  query getAnimeId(
    $search: String!
    $page: Int
    $perPage: Int
    $format: MediaFormat
  ) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
        # currentPage
        # lastPage
        # hasNextPage
      }

      media(
        search: $search
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
          native
          romaji
          userPreferred
        }
        airingSchedule {
          edges {
            node {
              timeUntilAiring
              episode
            }
          }
        }
        averageScore
        status
        format
        duration
        genres
        season
        seasonYear
        episodes
        description
      }
    }
  }
`);

export default GET_ANIME_BY_ID;
