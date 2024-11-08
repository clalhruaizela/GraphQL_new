import { Card } from "@/components/ui/card";
import { GET_PAGE_ANIME_MEDIA } from "@/graphql/get_anime_by_id/cardDetailMedia";
import { GET_ANIME_MEDIA_CHAR_VOICE } from "@/graphql/get_anime_by_id/MediaTrend";
import graphqlClient from "@/graphql/getGraphqlClient";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { formatTimeUntilAiring } from "../utilties/formatTimeUntilAiring";

const MediaPage = () => {
  const graphql = graphqlClient();
  const { id, title } = useParams();
  const [isExpanded, setIsExpanded] = useState(false);
  const { isLoading, isError, data } = useQuery({
    queryKey: [id],
    queryFn: async () => {
      return await graphql.request(GET_ANIME_MEDIA_CHAR_VOICE, {
        id,
        title,
      });
    },
  });

  const {
    isLoading: isLoading2,
    isError: error2,
    data: data2,
  } = useQuery({
    queryKey: [id],
    queryFn: async () => {
      return await graphql.request(GET_PAGE_ANIME_MEDIA, {
        id,
        title,
      });
    },
  });

  const toggelExpand = () => {
    setIsExpanded(!isExpanded);
  };

  if (isLoading || isLoading2) return <div>Loading...</div>;
  if (isError || error2) return <div>Error</div>;

  return (
    <div className="w-full h-full">
      <div className="">
        {data?.Media?.bannerImage && (
          <div className="">
            <img
              src={data?.Media?.bannerImage || ""}
              alt={data?.Media?.title?.english || ""}
              className="w-screen"
            />
          </div>
        )}
        <div className="w-full flex justify-center items-center flex-col">
          <div className="flex w-6/12 py-8 ">
            <div className="flex flex-row  ">
              {data?.Media?.coverImage?.large && (
                <img
                  src={data?.Media?.coverImage?.large || ""}
                  className={`${
                    data?.Media?.bannerImage ? "absolute left-96 top-80" : ""
                  }`}
                />
              )}
              <div className="text-gray-600 pl-16">
                <h1 className="font-bold text-xl ">
                  {data?.Media?.title?.english || ""}
                </h1>
                <p
                  className={`overflow-hidden gap-4 ${
                    isExpanded ? "max-h-full" : "max-h-24"
                  } transition-all duration-300 `}
                  onClick={toggelExpand}
                >
                  {data?.Media?.description
                    ?.replace(/<br\s*\/?>/gi, "\n")
                    .split("\n")
                    .map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                </p>
              </div>
            </div>
          </div>
          <div className=" bg-violet-500 w-full ">
            <div className="grid grid-cols-7 w-9/12 ml-20 ">
              <div className="col-span-2  text-black flex justify-center  ">
                <div className="w-full bg-red-500  flex justify-center items-center">
                  <div className="border rounded-sm bg-slate-400 ">
                    {data2?.Media?.airingSchedule?.edges
                      ?.filter((anime: any) => anime.node.timeUntilAiring > 0)
                      .slice(0, 1)
                      .map((anime: any, index: number) => (
                        <div key={index}>
                          <span>
                            <>Episode</>
                            {anime?.node?.episode}
                          </span>
                          <span>
                            airing in
                            {formatTimeUntilAiring(
                              anime?.node?.timeUntilAiring
                            )}
                            remaining
                          </span>
                        </div>
                      ))}
                  </div>
                  <div> {data2?.Media?.title?.english} </div>
                </div>
              </div>
              <div className="col-span-5">
                <h1>Characters</h1>
                <div className="grid grid-cols-6">
                  <div className="col-span-6 grid grid-cols-3 gap-2">
                    {data?.Media?.characters?.edges
                      ?.filter(
                        (anime) =>
                          (anime?.role === "MAIN" ||
                            anime?.role === "SUPPORTING") &&
                          anime?.node?.image?.large &&
                          anime?.voiceActors!.length > 0
                      )
                      .slice(0, 6)
                      .map((anime, index) => (
                        <Card key={index} className=" text-xs flex  w-96">
                          <div className="flex justify-center w-full ">
                            <img
                              src={anime?.node?.image?.large || ""}
                              alt={anime?.node?.name?.full || ""}
                              className="w-16 h-16 "
                            />
                            <div>
                              <div>{anime?.node?.name?.full || ""}</div>
                              <div> {anime?.role} </div>
                            </div>
                          </div>
                          {anime!.voiceActors!.length > 0 && (
                            <div className=" flex items-center ">
                              <div>
                                <h3 className="text-md font-semibold">
                                  {anime!.voiceActors![0]!.name!.full}
                                </h3>
                                <p className="text-sm text-gray-500">
                                  {anime!.voiceActors![0]!.languageV2}
                                </p>
                              </div>
                              <img
                                src={anime!.voiceActors![0]!.image!.large || ""}
                                alt={anime!.voiceActors![0]!.name!.full || ""}
                                className="w-16 h-16 "
                              />
                            </div>
                          )}
                        </Card>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaPage;
