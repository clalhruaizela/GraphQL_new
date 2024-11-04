import { useQuery } from "@tanstack/react-query";
import graphqlClient from "../graphql/getGraphqlClient";
import GET_ANIME_BY_ID from "../graphql/get_anime_by_id/anime";

import { useState } from "react";
import { formatDuration } from "./utilties/duration";
import { Card, CardHeader } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSearchParams } from "react-router-dom";

const AnimeHome = () => {
  const graphql = graphqlClient();
  const [hoverId, setHoverId] = useState<number | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const { isLoading, isError, data } = useQuery({
    queryKey: ["animePage", page],
    queryFn: async () => {
      return await graphql.request(GET_ANIME_BY_ID, {
        page,
        perPage: 28,
        lastPage: 20,
      });
    },
    keepPreviousData: true,
  });

  const handlePageChange = (page: number) => {
    setSearchParams(
      (param) => {
        param.set("page", page.toString());
        return param;
      },
      {
        preventScrollReset: true,
      }
    );
  };
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  // console.log(data);
  const totalPages = data?.Page?.pageInfo?.lastPage || 1;
  return (
    <div className="min-w-full min-h-screen bg-slate-900">
      <div className="lg:grid lg:grid-cols-6 lg:w-9/12 lg:mx-auto ">
        <div className="lg:col-span-4 ">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mx-4 ">
            {/* <div className="flex flex-"> */}
            {data?.Page?.media?.map((anime: any) => (
              <Card
                key={anime.id}
                className=" flex flex-col justify-center  text-white border-none bg-slate-900"
              >
                <CardHeader>
                  <Popover>
                    <PopoverTrigger>
                      <img
                        src={anime.coverImage?.large}
                        alt={anime.title?.english}
                        width="100%"
                        onMouseEnter={() => setHoverId(anime.id)}
                        onMouseLeave={() => setHoverId(null)}
                      />
                    </PopoverTrigger>
                    {hoverId === anime.id && (
                      <PopoverContent className="">
                        <h2 className="font-bold"> {anime.title?.english} </h2>
                        <div>Status: {anime.status} Airing </div>
                      </PopoverContent>
                    )}
                  </Popover>
                </CardHeader>
                <div className="flex flex-col justify-center text-sm">
                  <div>
                    <div className="truncate">{anime.title?.english}</div>
                  </div>
                  <div className="flex  gap-2">
                    <div>{anime.format}</div>
                    <div>
                      {anime.duration ? formatDuration(anime.duration) : "N/A"}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          {/* </div> */}
        </div>
        <div className=" lg:col-span-2 flex flex-col  items-center lg:w-9/12  bg-slate-700 ">
          {data?.Page?.media?.map((anime: any) => (
            <div key={anime.id} className=" w-full ">
              <Card className="flex flex-row bg-slate-700 border-l-0 border-r-0  rounded-none border-gray-600 text-white">
                <div className="py-4 pl-14">
                  <img
                    src={anime.coverImage?.large}
                    alt={anime.title?.english}
                    width="80%"
                  />
                </div>
                <div className="flex flex-col pt-5 pl-2 text-sm">
                  <div>
                    <div className="w-40">{anime.title?.english}</div>
                  </div>
                  <div>
                    <div>{anime.format}</div>
                    <div>
                      {anime.duration ? formatDuration(anime.duration) : "N/A"}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    {/* <p>Genres: {anime.genres.join(" , ")} </p> */}
                    {/* <p>Season: {anime.season} </p> */}
                    <p>Episode: {anime.episodes} </p>
                    {/* <p>Description: {anime.description}</p> */}
                  </div>
                </div>
              </Card>
            </div>
          ))}
          <div>
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
                        return <PaginationEllipsis key={item} />;
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
    </div>
  );
};

export default AnimeHome;
