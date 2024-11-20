import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import GET_ANIME_BY_ID from "@/graphql/get_anime_by_id/animeMedia";
import graphqlClient from "@/graphql/getGraphqlClient";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { formatTimeUntilAiring } from "./utilties/reUse/formatTimeUntilAiring";
import Layout from "@/components/ui/layout/Layout";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import AnimeGrid from "./AnimeGrid";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDebounce } from "./utilties/debounce";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import { MediaSort } from "@/gql/graphql";
import AnimeTrending from "./pages/animeTrending";

const AnimeHome = () => {
  const graphql = graphqlClient();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [debouncedValue] = useDebounce(searchTerm, 300);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const genre = searchParams.get("genre")?.split(",") || [];
  // console.log("genre", genre);

  const { isLoading, isError, data } = useQuery({
    queryKey: ["anime", page, genre],
    queryFn: async () => {
      return await graphql.request(GET_ANIME_BY_ID, {
        page,
        perPage: 6,
        sort: [MediaSort.PopularityDesc, MediaSort.TrendingDesc],
        search: debouncedValue,
        genres: genre.length ? genre : undefined,
      });
    },
    placeholderData: keepPreviousData,
    enabled: !!searchParams,
  });

  const handleTrendingClick = () => {
    navigate({
      pathname: "/trending",
      search: `?trending=${searchTerm}`,
    });
  };
  const handlePopularityClick = () => {
    navigate({
      pathname: "/popularity",
      search: `?popularity=${searchTerm}`,
    });
  };

  const handleFilterClick = (selectedGenre: string) => {
    const updatedGenres = selectedGenres.includes(selectedGenre)
      ? selectedGenres.filter((genre) => genre !== selectedGenre) // Remove genre
      : [...selectedGenres, selectedGenre]; // Add genre

    setSelectedGenres(updatedGenres);
    setSearchParams({ genre: updatedGenres.join(","), page: page.toString() });

    if (updatedGenres.length === 0) {
      navigate("/");
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      return;
    }
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

  const handlePageChange = (page: number) => {
    setSearchParams((param) => {
      param.set("page", page.toString());
      return param;
    });
  };
  const totalPages = Math.min(data?.Page?.pageInfo?.total || 1, 10);

  if (isError) return <div>Error</div>;
  return (
    <Layout>
      <div className="w-full min-h-screen py-6 pt-32 bg-[#e4ebf0]">
        <div className="flex justify-center items-center  pb-10">
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
        </div>
        <div className="grid grid-cols-6 xl:w-10/12 2xl:w-9/12  mx-auto">
          <h2 className="text-lg font-semibold text-gray-600 py-4 pl-6 ">
            TRENDING NOW
          </h2>
          <div></div>
          <AnimeGrid
            data={data?.Page?.media}
            isLoading={isLoading}
            onCardClick={onClickCard}
            formatTimeUntilAiring={formatTimeUntilAiring}
          />
          {/* <div className=" col-span-6 text-white">
            {totalPages > 1 && (
              <Pagination className="py-5 w-24 border-t-2 md:py-10 ">
                <PaginationContent>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (item) => {
                      if (
                        item === 1 ||
                        item === totalPages ||
                        Math.abs(page - item) <= 2 // Checks if the page number (item) is close enough to the current page (within 2 pages),
                      ) {
                        return (
                          <PaginationItem key={item}>
                            <PaginationLink
                              className="bg-black"
                              isActive={item === page}
                              onClick={() => {
                                window.scrollTo(0, 0);
                                handlePageChange(item);
                              }}
                            >
                              {item}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      } else if (item === page - 3 || item === page + 3) {
                        return (
                          <PaginationEllipsis
                            key={item}
                            className="text-black"
                          />
                        );
                      }
                      return null;
                    }
                  )}
                </PaginationContent>
              </Pagination>
            )}
          </div> */}
        </div>
      </div>
    </Layout>
  );
};

export default AnimeHome;
