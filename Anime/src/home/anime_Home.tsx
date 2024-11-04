import { useQuery } from "@tanstack/react-query";
import graphqlClient from "../graphql/getGraphqlClient";
import GET_ANIME_BY_ID from "../graphql/get_anime_by_id/anime";

import { useState } from "react";
import { formatDuration } from "./utilties/duration";
import { Card, CardHeader } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const AnimeHome = () => {
  const graphql = graphqlClient();
  const [page, setPage] = useState(1);
  const [hoverId, setHoverId] = useState(false);

  const { isLoading, isError, data } = useQuery({
    queryKey: [],
    queryFn: async () => {
      return await graphql.request(GET_ANIME_BY_ID, {
        page,
        perPage: 28,
        lastPage: 20,
      });
    },
  });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  // console.log(data);
  const totalPages = data?.Page?.pageInfo?.lastPage || 1;
  return (
    <div className="min-w-full min-h-screen bg-slate-900">
      <div className="grid grid-cols-6 w-9/12 mx-auto ">
        <div className="col-span-4 ">
          <div className="grid grid-cols-4 gap-4  ">
            {/* <div className="flex flex-"> */}
            {data?.Page?.media?.map((anime: any) => (
              <Card
                key={anime.id}
                className=" flex flex-col justify-center items-center text-white border-none bg-slate-900"
              >
                <CardHeader>
                  <Popover>
                    <PopoverTrigger>
                      <img
                        src={anime.coverImage?.large}
                        alt={anime.title?.english}
                        width="100%"
                      />
                    </PopoverTrigger>
                    <PopoverContent>
                      <h2 className="font-bold"> {anime.title?.english} </h2>
                      <div>Status: {anime.status} Airing </div>
                    </PopoverContent>
                  </Popover>
                </CardHeader>

                <div className="flex flex-col w-60 ">
                  <div>
                    <div className="truncate ...">
                      {" "}
                      Title: {anime.title?.english}
                    </div>
                  </div>
                  <div className="flex flex-row gap-6">
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
        <div className=" col-span-2 flex flex-col  items-center w-9/12  bg-slate-700 ">
          {data?.Page?.media?.map((anime: any) => (
            <div key={anime.id} className=" w-80 ">
              <Card className="flex flex-row bg-slate-700 border-l-0 border-r-0 rounded-none border-gray-600 text-white">
                <CardHeader>
                  <div>
                    <img
                      src={anime.coverImage?.large}
                      alt={anime.title?.english}
                      height={260}
                      width="100%"
                    />
                  </div>
                </CardHeader>
                <div className="flex flex-col pt-10 text-sm">
                  <div>
                    <div className="w-60">{anime.title?.english}</div>
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
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default AnimeHome;
