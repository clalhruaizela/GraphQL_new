import { MediaSort } from "@/gql/graphql";
import GET_ANIME_BY_ID from "@/graphql/get_anime_by_id/animeMedia";
import graphqlClient from "@/graphql/getGraphqlClient";
import AnimeGrid from "@/home/AnimeGrid";
import { formatTimeUntilAiring } from "@/home/utilties/reUse/formatTimeUntilAiring";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";

const PopularitySix = () => {
  const graphql = graphqlClient();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const popularity = searchParams.get("popularity") || "";

  const { isLoading, isError, data } = useQuery({
    queryKey: ["searchAnime-popularity", popularity],
    queryFn: async () => {
      return await graphql.request(GET_ANIME_BY_ID, {
        sort: [MediaSort.PopularityDesc],
      });
    },
    placeholderData: keepPreviousData,
    enabled: !!popularity || !!searchParams,
  });

  const onClickCard = (id: number, title: string) => {
    const formatTitle = title.replace(/\s+/g, "-");
    setTimeout(() => {
      navigate(`/${formatTitle}/${id}`);
    }, 500);
  };

  if (isError) {
    return <div>Error</div>;
  }
  const limitedData = data?.Page?.media?.slice(0, 6);
  return (
    <>
      <AnimeGrid
        data={limitedData}
        isLoading={isLoading}
        onCardClick={onClickCard}
        formatTimeUntilAiring={formatTimeUntilAiring}
      />
    </>
  );
};

export default PopularitySix;
