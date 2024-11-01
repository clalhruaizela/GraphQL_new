import { useQuery } from "@tanstack/react-query";
import graphqlClient from "../graphql/getGraphqlClient";
import GET_ANIME_BY_ID from "../graphql/get_anime_by_id/anime";

const graphql = graphqlClient();
const AnimeHome = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: [],
    queryFn: async () => {
      return await graphql.request(GET_ANIME_BY_ID, {
        id,
        page: 1,
        perPage: 10,
      });
    },
  });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  console.log(data);
  return (
    <>
      <div>home</div>
      <p> </p>
      <p>{data?.Page?.media?.[0]?.title?.english}</p>
      <p> {data?.Page?.media?.[0]?.description}</p>
    </>
  );
};

export default AnimeHome;
