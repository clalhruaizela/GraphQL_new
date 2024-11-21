import graphqlClient from "@/graphql/getGraphqlClient";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDebounce } from "../utilties/debounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { MediaSort } from "@/gql/graphql";
import GET_ANIME_BY_ID from "@/graphql/get_anime_by_id/animeMedia";
import AnimeGrid from "../AnimeGrid";
import { formatTimeUntilAiring } from "../utilties/reUse/formatTimeUntilAiring";

const AnimePopularity = () => {
  const graphql = graphqlClient();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchParams] = useSearchParams();
  const popularity = searchParams.get("popularity") || "";
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { isLoading, isError, data } = useQuery({
    queryKey: ["searchAnime", popularity, debouncedSearchTerm],
    queryFn: async () => {
      return await graphql.request(GET_ANIME_BY_ID, {
        sort: [MediaSort.PopularityDesc],
      });
    },
    placeholderData: keepPreviousData,
    enabled: !!popularity || !!searchParams || !!debouncedSearchTerm,
  });

  const onClickCard = (id: number, title: string) => {
    const formatTitle = title.replace(/\s+/g, "-");
    setTimeout(() => {
      navigate(`/${formatTitle}/${id}`);
    }, 500);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate({
      pathname: "/search",
      search: `?name=${searchTerm}`,
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }
  return (
    <div className="w-full min-h-screen py-6 pt-32 bg-[#e4ebf0]">
      <div className="flex justify-center items-center w-full pb-10">
        <div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearchSubmit}>Search</button>
        </div>
        <div className="grid grid-cols-6 xl:w-10/12 2xl:w-9/12 mx-auto">
          <AnimeGrid
            data={data?.Page?.media}
            isLoading={isLoading}
            onCardClick={onClickCard}
            formatTimeUntilAiring={formatTimeUntilAiring}
          />
        </div>
      </div>
    </div>
  );
};

export default AnimePopularity;
