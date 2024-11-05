import { graphql } from "@/gql";

export const GET_ANIME_BY_ID_MEDIA_TREND = graphql(`
  query getTrend($page: Int, $perPage: Int = 10) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        perPage
      }
      media(sort: TRENDING_DESC) {
        coverImage {
          large
        }
        title {
          english
        }
      }
    }
  }
`);
