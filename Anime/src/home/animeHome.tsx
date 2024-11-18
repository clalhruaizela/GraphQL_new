import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
import GET_ANIME_BY_ID from "@/graphql/get_anime_by_id/animeMedia";
import graphqlClient from "@/graphql/getGraphqlClient";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { formatTimeUntilAiring } from "./utilties/formatTimeUntilAiring";
// import { SmileOutlined } from "@ant-design/icons";
import Layout from "@/components/ui/layout/Layout";
// import { Skeletons } from "./utilties/skeletion";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import AnimeGrid from "./AnimeGrid";
import { useDebounce } from "./utilties/debounce";

const AnimeHome = () => {
  const graphql = graphqlClient();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");

  const { isLoading, isError, data } = useQuery({
    queryKey: ["anime", page],
    queryFn: async () => {
      return await graphql.request(GET_ANIME_BY_ID, {
        page,
        perPage: 50,
        lastPage: 10,
      });
    },
    placeholderData: keepPreviousData,
    enabled: !!searchParams,
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({
      pathname: "/search",
      search: `?name=${searchTerm}`,
    });
  };
  const handlePageChange = (page: number) => {
    setSearchParams((param) => {
      param.set("page", page.toString());
      return param;
    });
  };

  const onClickCard = (id: number, title: string) => {
    const formatTitle = title.replace(/\s+/g, "-");
    setTimeout(() => {
      window.scrollTo(0, 0);
      navigate(`/home/${id}/${formatTitle}`);
    }, 500);
  };

  const totalPages = Math.min(data?.Page?.pageInfo?.total || 1, 10);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

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
              className="text-black py-1 pl-2 pr-6 "
            />
            {searchTerm && ( // Only show the clear button when there is input
              <button
                onClick={() => setSearchTerm("")} // Clears the input field
                className="text-black -ml-5 mr-2"
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
        </div>
        <div className="grid grid-cols-6 xl:w-10/12 2xl:w-9/12  mx-auto">
          <AnimeGrid
            data={data?.Page?.media}
            isLoading={isLoading}
            onCardClick={onClickCard}
            formatTimeUntilAiring={formatTimeUntilAiring}
          />
          <div className=" col-span-6 text-white">
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AnimeHome;
