import { MediaSort } from "@/gql/graphql";
import GET_ANIME_BY_ID from "@/graphql/get_anime_by_id/animeMedia";
import graphqlClient from "@/graphql/getGraphqlClient";
import { formatTimeUntilAiring } from "@/home/utilties/reUse/formatTimeUntilAiring";
import HomeGrid from "@/home/utilties/reUse/home/HomeGrid";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const PopularitySix = () => {
  const graphql = graphqlClient();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const popularity = searchParams.get("popularity") || "";
  const [itemToShow, setItemToShow] = useState(6);

  useEffect(() => {
    const updateItemToShow = () => {
      const width = window.innerWidth;
      if (width >= 1536) {
        setItemToShow(6);
      } else if (width >= 1280) {
        setItemToShow(5);
      } else if (width >= 1024) {
        setItemToShow(6);
      } else if (width >= 768) {
        setItemToShow(5);
      } else {
        setItemToShow(3);
      }
    };
    updateItemToShow();
    window.addEventListener("resize", updateItemToShow);

    return () => {
      window.removeEventListener("resize", updateItemToShow);
    };
  }, []);

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
      navigate(`/home/${id}/${formatTitle}`);
    }, 500);
  };

  if (isError) {
    return <div>Error</div>;
  }
  const limitedDatas = data?.Page?.media?.slice(0, itemToShow);
  return (
    <>
      <HomeGrid
        data={limitedDatas}
        isLoading={isLoading}
        onCardClick={onClickCard}
        formatTimeUntilAiring={formatTimeUntilAiring}
      />
    </>
  );
};

export default PopularitySix;
