import { MediaSort } from "@/gql/graphql";
import GET_ANIME_BY_ID from "@/graphql/get_anime_by_id/animeMedia";
import graphqlClient from "@/graphql/getGraphqlClient";
import AnimeGrid from "@/home/AnimeGrid";
import { formatTimeUntilAiring } from "@/home/utilties/reUse/formatTimeUntilAiring";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";

const TrendingSix = () => {
  const graphql = graphqlClient();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const trending = searchParams.get("trending") || "";

  const { isLoading, isError, data } = useQuery({
    queryKey: ["searchAnime", trending],
    queryFn: async () => {
      return await graphql.request(GET_ANIME_BY_ID, {
        sort: [MediaSort.TrendingDesc],
      });
    },
    placeholderData: keepPreviousData,
    enabled: !!trending || !!searchParams,
  });

  const onClickCard = (id: number, title: string) => {
    const formatTitle = title.replace(/\s+/g, "-");
    setTimeout(() => {
      navigate(`/${formatTitle}/${id}`);
    }, 500);
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }

  const limitedDatas = data?.Page?.media?.slice(0, 6);
  return (
    <div>
      <AnimeGrid
        data={limitedDatas}
        onCardClick={onClickCard}
        isLoading={isLoading}
        formatTimeUntilAiring={formatTimeUntilAiring}
      />
    </div>
  );
};

export default TrendingSix;
