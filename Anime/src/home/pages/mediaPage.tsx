import graphqlClient from "@/graphql/getGraphqlClient";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const MediaPage = () => {
  const graphql = graphqlClient();
  const { id, title } = useParams();
  const { isLoading, isError, data } = useQuery({
    queryKey: [],
    queryFn: async () => {},
  });
  return (
    <div>
      MediaPage
      <div> {data.title} </div>
    </div>
  );
};

export default MediaPage;
