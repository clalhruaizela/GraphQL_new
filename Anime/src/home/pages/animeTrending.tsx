import { Button } from "@/components/ui/button";
import { MediaSort } from "@/gql/graphql";
import GET_ANIME_BY_ID from "@/graphql/get_anime_by_id/animeMedia";
import graphqlClient from "@/graphql/getGraphqlClient";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDebounce } from "../utilties/debounce";
import AnimeGrid from "../AnimeGrid";
import { formatTimeUntilAiring } from "../utilties/reUse/formatTimeUntilAiring";

const AnimeTrending = () => {
  const navigate = useNavigate();
  const graphql = graphqlClient();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchParams] = useSearchParams();
  const trending = searchParams.get("trending") || "";
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { isLoading, isError, data } = useQuery({
    queryKey: ["searchAnime", trending, debouncedSearchTerm],
    queryFn: async () => {
      return await graphql.request(GET_ANIME_BY_ID, {
        sort: [MediaSort.TrendingDesc],
      });
    },
    placeholderData: keepPreviousData,
    enabled: !!trending || !!searchParams || !!debouncedSearchTerm,
  });
  const onClickCard = (id: number, title: string) => {
    const formatTitle = title.replace(/\s+/g, "-");
    setTimeout(() => {
      window.scrollTo(0, 0);
      navigate(`/home/${id}/${formatTitle}`);
    }, 500);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({
      pathname: "/search",
      search: `?search=${searchTerm}`,
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
            className="text-black py-1"
          />
          <Button
            variant={"destructive"}
            type="submit"
            onClick={handleSearchSubmit}
          >
            search
          </Button>
        </div>
        <div className="grid grid-cols-6 xl:w-10/12 2xl:w-9/12  mx-auto">
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

export default AnimeTrending;
