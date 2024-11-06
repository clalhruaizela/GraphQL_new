import { useQuery } from "@tanstack/react-query";
import graphqlClient from "../graphql/getGraphqlClient";
// import GET_ANIME_BY_ID from "../graphql/get_anime_by_id/animeMedia";
import { useEffect, useState } from "react";
// import { formatDuration } from "./utilties/duration";
// import { Card, CardHeader } from "@/components/ui/card";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
// } from "@/components/ui/pagination";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { useSearchParams } from "react-router-dom";
import MediaPage from "./pages/mediaPage";
import { GET_SEARCH_ANIME } from "@/graphql/search/animeSearch";
import { Button } from "@/components/ui/button";

const AnimeHome = () => {
  const graphql = graphqlClient();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  // const [hoverId, setHoverId] = useState<number | null>(null);
  // const [searchParams, setSearchParams] = useSearchParams();
  // const page = parseInt(searchParams.get("page") || "1");
  const { isLoading, isError, data } = useQuery({
    queryKey: ["animeSearch", query, page],
    queryFn: async () => {
      if (!query) return;
      const data = await graphql.request(GET_ANIME_BY_ID, {
        search: query,
        page,
      });
      return data;
    },
    enabled: !!query,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery(searchTerm);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  // const handlePageChange = (page: number) => {
  //   setSearchParams(
  //     (param) => {
  //       param.set("page", page.toString());
  //       return param;
  //     },
  //     {
  //       preventScrollReset: true,
  //     }
  //   );
  // };

  // if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  // console.log("Fetched Anime Data1:", data);

  // const totalPages = data?.Page?.pageInfo?.lastPage || 1;
  return (
    <div className="min-w-full min-h-screen bg-slate-900">
      <div className="lg:grid lg:grid-cols-6 lg:w-9/12 lg:mx-auto ">
        <div className="lg:col-span-6">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              // onKeyDown={handleKeyDown}
              placeholder="Search Anime"
              className="border mb-2 px-2 rounded-sm h-6 w-36 md:mt-4 lg:h-10 lg:w-60"
            />
            <Button
              type="submit"
              className="h-6 w-14 lg:h-10"
              variant="destructive"
            >
              Search
            </Button>
          </form>
          {isLoading && <p>Loading...</p>}{" "}
          {isError && <p>Error fetching data.</p>}
          <div>
            {/* {data && (
            <>
              <ul className="bg-white w-36 h-28">
                {data?.Page?.media?.map((anime: any) => (
                  <li key={anime.id}>
                    {" "}
                    <img
                      src={anime.coverImage.large}
                      alt={anime.title.english}
                    />{" "}
                    <h3>{anime.title.english}</h3> <p>{anime.description}</p>{" "}
                    <ul>
                      {" "}
                      {anime.genres.map((genre: string) => (
                        <li key={genre}>{genre}</li>
                      ))}{" "}
                    </ul>{" "}
                  </li>
                ))}
              </ul>
              <div>
                {Array.from(
                  { length: data?.Page?.pageInfo?.lastPage },
                  (_, i) => i + 1
                ).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    disabled={pageNum === page}
                  >
                    {pageNum}{" "}
                  </button>
                ))}
              </div>
            </>
          )} */}
          </div>
          {/* <div>
          {data?.Page?.media?.map((anime: any) => (
            <div key={anime.id}>
              <img src={anime.coverImage?.large} alt={anime.title?.english} />
              <div>{anime.title?.english || anime.title?.romaji}</div>
            </div>
          ))}
        </div> */}
          <div className="lg:col-span-6">{/* <MediaPage /> */}</div>
          {/* <h2 className="col-span-6 fornt-bold text-2xl pt-4  text-white">
          Current Airing
        </h2>
        <div className="lg:col-span-6  ">
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mx-4 ">
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
                        width="70%"
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
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default AnimeHome;
