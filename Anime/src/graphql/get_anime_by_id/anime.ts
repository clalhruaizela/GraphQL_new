import { graphql } from "../../gql";

const GET_ANIME_BY_ID = graphql(`
  query getAnimeId($id: Int, $page: Int = 4, $perPage: Int = 10) {
    Page(page: $page, perPage: $perPage) {
      media(id: $id, type: ANIME) {
        id
        title {
          english
        }
        description
      }
    }
  }
`);

export default GET_ANIME_BY_ID;
