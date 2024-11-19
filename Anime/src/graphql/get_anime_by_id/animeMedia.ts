import { graphql } from "../../gql";

const GET_ANIME_BY_ID = graphql(`
  query getAnimeId(
    $id: Int
    $search: String
    $page: Int
    $perPage: Int
    $format: MediaFormat
    $genres: [String]
    $isAdult: Boolean = false
    $sort: [MediaSort] = [POPULARITY_DESC, SCORE_DESC, TRENDING_DESC]
  ) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        hasNextPage
      }
      media(
        id: $id
        search: $search
        type: ANIME
        format: $format
        sort: $sort
        status: RELEASING
        isAdult: $isAdult
        genre_in: $genres
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
