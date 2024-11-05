import { Card } from "@/components/ui/card";
import { GET_ANIME_BY_ID_MEDIA_TREND } from "@/graphql/get_anime_by_id/MediaTrend";

import graphqlClient from "@/graphql/getGraphqlClient";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

const MediaTrends = () => {
  const graphql = graphqlClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const { isLoading, isError, data } = useQuery({
    queryKey: [page],

    queryFn: async () => {
      return await graphql.request(GET_ANIME_BY_ID_MEDIA_TREND, {
        page,
        perPage: 10,
      });
    },
    keepPreviousData: true,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  return (
    <div>
      <div>
        {data?.Page?.media?.map((anime: any) => (
          <Card>
            <div>
              <img
                src={anime?.coverImage?.large}
                alt={anime?.title?.english}
                width={100}
              />
            </div>
            <div>{anime?.title?.english}</div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MediaTrends;
