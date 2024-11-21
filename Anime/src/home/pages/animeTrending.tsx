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
import Layout from "@/components/ui/layout/Layout";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MenuUnfoldOutlined } from "@ant-design/icons";

const AnimeTrending = () => {
  const navigate = useNavigate();
  const graphql = graphqlClient();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const trending = searchParams.get("trending") || "";
  const [debouncedValue] = useDebounce(searchTerm, 300);
  const genre = searchParams.get("genre")?.split(",") || [];
  const page = parseInt(searchParams.get("page") || "1");

  const { isLoading, isError, data } = useQuery({
    queryKey: ["searchAnime", trending, genre],
    queryFn: async () => {
      return await graphql.request(GET_ANIME_BY_ID, {
        search: debouncedValue,
        sort: [MediaSort.TrendingDesc],
        genres: genre.length ? genre : undefined,
      });
    },
    placeholderData: keepPreviousData,
    enabled: !!searchParams,
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
    if (!searchTerm.trim()) {
      return;
    }
    navigate({
      pathname: "/search",
      search: `?name=${searchTerm}`,
    });
  };

  const handleFilterClick = (selectedGenre: string) => {
    const updatedGenres = selectedGenres.includes(selectedGenre)
      ? selectedGenres.filter((genre) => genre !== selectedGenre) // Remove genre
      : [...selectedGenres, selectedGenre]; // Add genre
    setSelectedGenres(updatedGenres);
    setSearchParams({ genre: updatedGenres.join(","), page: page.toString() });

    if (updatedGenres.length === 0) {
      navigate("/trending");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }
  return (
    <Layout>
      <div className="w-full min-h-screen py-6 pt-32 bg-[#e4ebf0]">
        <div className="flex flex-col justify-center items-center w-full pb-10">
          <div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-black py-1 px-2 "
            />
            {searchTerm && ( // Only show the clear button when there is input
              <button
                onClick={() => setSearchTerm("")} // Clears the input field
                className="text-black -ml-5 mr-2 text-sm"
              >
                X
              </button>
            )}
            <Button
              variant={"destructive"}
              type="submit"
              onClick={handleSearchSubmit}
            >
              search
            </Button>
          </div>
          <div>
            <div>
              <Popover>
                <PopoverTrigger className="text-3xl  ml-2">
                  <MenuUnfoldOutlined />{" "}
                </PopoverTrigger>
                <PopoverContent className="">
                  <div className="grid grid-cols-8 gap-1  ">
                    <div className="col-span-8 ">
                      <h2>Genres</h2>
                      <div className="grid grid-cols-8">
                        {Array.from(
                          new Set(
                            data?.Page?.media
                              ?.flatMap((anime) => anime?.genres)
                              .filter(
                                (genre, index, genres) =>
                                  genres.indexOf(genre) === index
                              )
                              .map((genre, index) => (
                                <div key={index} className="mb-2 col-span-1">
                                  <Button
                                    onClick={() => handleFilterClick(genre!)}
                                    className={`px-3 py-1 rounded ${
                                      selectedGenres.includes(genre!)
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-600"
                                    }`}
                                  >
                                    {genre}
                                  </Button>
                                </div>
                              ))
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <AnimeGrid
                data={data?.Page?.media}
                isLoading={isLoading}
                onCardClick={onClickCard}
                formatTimeUntilAiring={formatTimeUntilAiring}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AnimeTrending;
