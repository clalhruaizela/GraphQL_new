import { graphql } from "@/gql";

export const GET_FILTERED_GENRES = graphql(`
  query getFilterAnime($genre: [String!]) {
    Page {
      media(genre_in: $genre, type: ANIME) {
        id
        genres
        title {
          english
          native
          romaji
          userPreferred
        }
        coverImage {
          extraLarge
          large
          medium
          color
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
