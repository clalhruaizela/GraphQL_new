import { graphql } from "@/gql";

export const GET_SEARCH_ANIME = graphql(`
  query getSearchAnime($search: String) {
    Page {
      media(search: $search, type: ANIME) {
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
