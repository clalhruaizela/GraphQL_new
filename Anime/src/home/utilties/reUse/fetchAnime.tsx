import GET_ANIME_BY_ID from "@/graphql/get_anime_by_id/animeMedia";
import graphqlClient from "@/graphql/getGraphqlClient";

export const fetchAnime = async (
  search: string,
  page: number,
  perPage: number = 50
) => {
  const client = graphqlClient();
  const variables = { search, page, perPage, format: null };
  return await client.request(GET_ANIME_BY_ID, variables);
};
