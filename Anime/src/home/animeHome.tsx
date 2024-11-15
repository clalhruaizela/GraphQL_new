import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import GET_ANIME_BY_ID from "@/graphql/get_anime_by_id/animeMedia";
import graphqlClient from "@/graphql/getGraphqlClient";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { formatTimeUntilAiring } from "./utilties/formatTimeUntilAiring";
import { SmileOutlined } from "@ant-design/icons";
import Layout from "@/components/ui/layout/Layout";
import { Skeletons } from "./utilties/skeletion";
import React, { useState } from "react";

const AnimeHome = () => {
  const graphql = graphqlClient();
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const { isLoading, isError, data } = useQuery({
    queryKey: ["anime", page],
    queryFn: async () => {
      return await graphql.request(GET_ANIME_BY_ID, {
        search,
        page,
        perPage: 50,
        // lastPage: 10,
      });
    },
    placeholderData: keepPreviousData,
    enabled: !!search || !!searchParams,
  });

  const handlePageChange = (page: number) => {
    setSearchParams((param) => {
      param.set("page", page.toString());
      return param;
    });
  };

  const handleSearchSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch();
  };
  const onClickCard = (id: number, title: string) => {
    const formatTitle = title.replace(/\s+/g, "-");
    setTimeout(() => {
      window.scrollTo(0, 0);
      navigate(`/home/${id}/${formatTitle}`);
    }, 500);
  };

  const totalPages = Math.min(data?.Page?.pageInfo?.total || 1, 10);

  if (isError) return <div>Error</div>;
  return (
    <Layout>
      <div className="w-full min-h-screen py-6 pt-32 bg-[#e4ebf0]">
        <div>
          <div>
            <input type="text" value={search} className="text-black py-1" />
            <button onClick={handleSearchSubmit}></button>
          </div>
        </div>
        <div className="grid grid-cols-6 xl:w-10/12 2xl:w-9/12  mx-auto">
          <div className="col-span-6 grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-5 2xl:grid-cols-6 mx-4 gap-4">
            {isLoading ? (
              <Skeletons amount={30} className="h-72 col-span-1" />
            ) : (
              <>
                {data?.Page?.media?.map((anime: any) => (
                  <Card
                    key={anime?.id}
                    className="w-full text-gray-400 hover:text-gray-600"
                    onClick={() =>
                      onClickCard(anime?.id, anime?.title?.english || "")
                    }
                  >
                    <div className="flex flex-col justify-center items-center mb-5 h-53 ">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger
                            asChild
                            className="aspect-ratio-1/1 h-40 w-32 md:h-48 xl:w-56 xl:h-60 2xl:w-52 2xl:h-72"
                          >
                            <img
                              src={anime?.coverImage?.large}
                              alt={anime?.title?.english}
                              width="70%"
                              height="70%"
                            />
                          </TooltipTrigger>
                          <TooltipContent className="w-80 flex justify-center items-center flex-col py-5">
                            <div>
                              <h2 className="text-gray-800 text-lg font-semibold">
                                {anime?.title?.english ||
                                  anime?.title?.romaji ||
                                  anime.title?.native ||
                                  anime.title.userPreferred}
                              </h2>

                              {anime?.airingSchedule?.edges
                                ?.filter(
                                  (edge: any) => edge.node.timeUntilAiring > 0
                                )
                                .slice(0, 1)
                                .map((edge: any, index: number) => (
                                  <div
                                    key={index}
                                    className="flex py-2 gap-2 font-bold items-center"
                                  >
                                    <span className="text-lg font-semibold">
                                      Ep {edge.node?.episode}
                                    </span>
                                    <span className="text-base text-gray-600">
                                      airing in{" "}
                                      {formatTimeUntilAiring(
                                        edge.node?.timeUntilAiring
                                      )}{" "}
                                      remaining
                                    </span>
                                  </div>
                                ))}
                              <div className=" flex flex-row gap-1 ">
                                <p className="text-green-400 text-lg">
                                  <SmileOutlined />
                                </p>
                                <p className="font-bold pt-1">
                                  {anime.averageScore}%
                                </p>
                              </div>
                              <div className="flex flex-row gap-2  text-gray-500">
                                <p> {anime.season} </p>
                                <p> {anime?.seasonYear} </p>
                              </div>
                              <div className="flex flex-row gap-2 pb-2 text-gray-500">
                                <p> {anime?.format} Show </p>
                                <p> {anime?.episodes} episodes </p>
                              </div>
                              <div className="flex flex-row gap-2 flex-wrap  pt-2">
                                {anime.genres
                                  ?.slice(0, 3)
                                  .map((genre: string, index: number) => (
                                    <div
                                      key={index}
                                      className={`  py-1 text-xs font-semibold rounded-xl text-center  ${
                                        genre === "Comedy"
                                          ? "bg-red-500 text-white w-20"
                                          : "bg-red-500 text-white w-20"
                                      }`}
                                    >
                                      {" "}
                                      {genre}{" "}
                                    </div>
                                  ))}
                              </div>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <CardContent className="p-0">
                      <div className="text-xs  2xl:w-full md:text-sm md:font-semibold lg:font-bold   flex flex-col   items-center w-full h-8 md:w-full  md:h-10 overflow-hidden lg:w-48 pl-1   ">
                        <h1 className="">
                          {anime?.title?.english ||
                            anime?.title?.romaji ||
                            anime?.title?.native ||
                            anime.title?.userPreferred}
                        </h1>
                        {/* <p>{anime?.description}</p> */}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </>
            )}
          </div>
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
