import { Button } from "@/components/ui/button";
import graphqlClient from "@/graphql/getGraphqlClient";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";

import { formatTimeUntilAiring } from "../utilties/reUse/formatTimeUntilAiring";

import { GET_SEARCH_ANIME } from "@/graphql/search/animeSearch";
import Layout from "@/components/ui/layout/Layout";
import { useState } from "react";
import AnimeGrid from "../AnimeGrid";
import { useDebounce } from "../utilties/debounce";

const AnimeSearch = () => {
  const graphql = graphqlClient();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchParams] = useSearchParams();
  const search = searchParams.get("name") || "";

  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { isLoading, isError, data } = useQuery({
    queryKey: ["searchAnime", search, debouncedSearchTerm],
    queryFn: async () => {
      return await graphql.request(GET_SEARCH_ANIME, {
        search: search,
      });
    },
    placeholderData: keepPreviousData,
    enabled: !!search || !!searchParams || !!debouncedSearchTerm,
  });
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({
      pathname: "/search",
      search: `?search=${searchTerm}`,
    });
  };
  const onClickCard = (id: number, title: string) => {
    const formatTitle = title.replace(/\s+/g, "-");
    setTimeout(() => {
      window.scrollTo(0, 0);
      navigate(`/home/${id}/${formatTitle}`);
    }, 500);
  };
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  console.log(data);
  return (
    <Layout>
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
    </Layout>
  );
};

export default AnimeSearch;
