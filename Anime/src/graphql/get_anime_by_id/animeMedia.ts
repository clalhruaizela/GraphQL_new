import { graphql } from "../../gql";

const GET_ANIME_BY_ID = graphql(`
  query getAnimeId(
    $id: Int
    $search: String
    $page: Int
    $perPage: Int
    $format: MediaFormat
    $genres: [String]
    $status: MediaStatus
    $isAdult: Boolean = false
    $sort: [MediaSort]
    $season: MediaSeason
  ) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        hasNextPage
        total
      }
      media(
        id: $id
        search: $search
        type: ANIME
        format: $format
        sort: $sort
        status: $status
        isAdult: $isAdult
        genre_in: $genres
        season: $season
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
