import { keepPreviousData, useQuery } from "@tanstack/react-query";
import graphqlClient from "../graphql/getGraphqlClient";
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import MediaPage from "./pages/mediaPage";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";
import GET_ANIME_BY_ID from "@/graphql/get_anime_by_id/animeMedia";

const AnimeHome = () => {
  const graphql = graphqlClient();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [suggestion, setSuggestion] = useState<string[]>([]);
  const [submit, setSubmit] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  // const [hoverId, setHoverId] = useState<number | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const { isLoading, isError, data } = useQuery({
    queryKey: ["animeSearch", searchTerm, page],
    queryFn: async () => {
      return await graphql.request(GET_ANIME_BY_ID, {
        search: searchTerm,
        page,
        perPage: 30,
      });
    },
    placeholderData: keepPreviousData,
    enabled: !!searchParams,
  });

  const handleSearchSubmit = () => {
    // e.preventDefault();
    setSubmit(searchTerm);
    // e.currentTarget.reset();
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams(
      (param) => {
        param.set("page", newPage.toString());
        return param;
      },
      {
        preventScrollReset: true,
      }
    );
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setSuggestion([]);
  };

  const filteredData =
    data?.Page?.media?.filter((anime) =>
      submit
        ? anime?.title?.english?.toLowerCase().includes(submit.toLowerCase())
        : true
    ) || [];

  useEffect(() => {
    if (submit && filteredData.length === 0) {
      setErrorMessage("No results found. Please try a different search term.");
    } else {
      setErrorMessage("");
    }
  }, [submit, filteredData.length]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  // console.log("Fetched Anime Data1:", data);

  const totalPages = data?.Page?.pageInfo?.lastPage || 1;
  return (
    <div className="min-w-full min-h-screen ">
      <div className="lg:grid lg:grid-cols-6 lg:w-9/12 lg:mx-auto ">
        <div className="lg:col-span-6">
          <>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              // onKeyDown={handleKeyDown}
              placeholder="Search Anime"
              className="border mb-2 px-2 rounded-sm h-6 w-36 md:mt-4 lg:h-10 lg:w-60"
            />
            <Button
              // type="submit"
              onClick={handleSearchSubmit}
              className="h-6 w-14 lg:h-10"
              variant="destructive"
            >
              Search
            </Button>
            <div>
              {suggestion.length > 0 && (
                <ul className="absolute">
                  {suggestion.map((suggestion) => (
                    <li
                      key={suggestion}
                      className="text-red-400"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
          <div>
            {errorMessage ? (
              <div>
                <div>{errorMessage}</div>
              </div>
            ) : (
              filteredData.map((anime) => (
                <div key={anime?.id}>{/* <MediaPage anime={anime} /> */}</div>
              ))
            )}
          </div>
          <div className="py-10">
            {totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (item) => {
                      if (
                        item === 1 ||
                        item === totalPages ||
                        Math.abs(item - page) <= 2
                      ) {
                        return (
                          <PaginationItem key={item}>
                            <PaginationLink
                              className="bg-gray-500"
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
                            className="text-white"
                          />
                        );
                      }
                      return null;
                    }
                  )}
                </PaginationContent>
              </Pagination>
            )}
          </div>
          <div className="lg:col-span-6">{/* <MediaPage /> */}</div>
        </div>
      </div>
    </div>
  );
};

export default AnimeHome;
