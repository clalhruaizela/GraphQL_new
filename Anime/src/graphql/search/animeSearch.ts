import { graphql } from "@/gql";

export const GET_SEARCH_ANIME = graphql(`
  query searchAime($search: String!) {
    Page {
      media(search: $search, type: ANIME) {
        id
        coverImage {
          large
        }
        title {
          english
          romaji
        }
      }
    }
  }
`);
