import { Card } from "@/components/ui/card";
import { GET_PAGE_ANIME_MEDIA } from "@/graphql/get_anime_by_id/cardDetailMedia";
import { GET_ANIME_MEDIA_CHAR_VOICE } from "@/graphql/get_anime_by_id/MediaTrend";
import graphqlClient from "@/graphql/getGraphqlClient";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { formatTimeUntilAiring } from "../utilties/formatTimeUntilAiring";
import { Button } from "@/components/ui/button";

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
    queryKey: [`pageAnimeMedia-${id}`],
    queryFn: async () => {
      return await graphql.request(GET_PAGE_ANIME_MEDIA, {
        id,
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
      <div className="flex flex-col">
        {data?.Media?.bannerImage && (
          <div className="relative">
            <img
              src={data?.Media?.bannerImage || ""}
              alt={data?.Media?.title?.english || ""}
              className="object-cover w-full h-52"
            />
          </div>
        )}
        <div className="w-full  ">
          <div className=" relative -mt-20  ">
            <div className="grid grid-cols-[100px_auto] gap-5 items-end static pl-6 ">
              {data?.Media?.coverImage?.large && (
                <img
                  src={data?.Media?.coverImage?.large || ""}
                  className={`${
                    data?.Media?.bannerImage
                      ? "static w-24 xl:left-96 xl:top-80  lg:left-56 lg:top-48   lg:w-44"
                      : ""
                  }`}
                />
              )}
              <div className="gap-1 flex flex-row ">
                <div className="items-center">
                  <Button variant={"default"}> Add To List </Button>
                </div>
                <div>
                  <Button variant={"destructive"}>Love</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 border-b-2">
          <div className="text-gray-600  pl-16 lg:pl-10">
            <h1 className="font-bold text-xl ">
              {data?.Media?.title?.english || ""}
            </h1>
            <p
              className={`hidden overflow-hidden gap-4 ${
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
        <div className=" bg-gray-100   px-4  mt-10  ">
          <div className="">
            <div className=" w-4/5 mx-auto py-4  text-black text-nowrap flex flex-row justify-center overflow-x-auto ">
              <div className="w-full  bg-white font-medium items-center  flex whitespace-nowrap text-xs ">
                <div className=" pr-10  ">
                  <h2 className="pb-1">Airing</h2>
                  {data2?.Media?.airingSchedule?.edges
                    ?.filter((anime: any) => anime?.node?.timeUntilAiring > 0)
                    .slice(0, 1)
                    .map((anime: any, index: number) => (
                      <div key={index} className=" text-blue-600 ">
                        <span>
                          <>Ep</>
                          {anime?.node?.episode}:
                        </span>
                        <span>
                          {formatTimeUntilAiring(anime?.node?.timeUntilAiring)}
                        </span>
                      </div>
                    ))}
                </div>
                <div className=" pr-10 ">
                  <h2 className="pb-1">Format</h2>
                  {data2?.Media?.format}
                </div>
                <div className=" pr-10 ">
                  <h2 className="pb-1">Episodes</h2>
                  {data2?.Media?.episodes}
                </div>
                <div className=" pr-10 ">
                  <h2 className="pb-1">Duration</h2>
                  {data2?.Media?.duration}
                </div>
                <div className=" pr-10 ">
                  <h2 className="pb-1">Status</h2>
                  {data2?.Media?.status}
                </div>
                <div className=" pr-10 ">
                  {data2?.Media?.startDate && (
                    <div>
                      <h2 className="pb-1">Start date</h2>
                      <div>
                        {data2?.Media?.startDate.day &&
                        data2.Media.startDate.month &&
                        data2.Media.startDate.year
                          ? `${data2.Media.startDate.day}/${data2.Media.startDate.month}/${data2.Media.startDate.year}`
                          : "start date not available"}
                      </div>
                    </div>
                  )}
                </div>
                <div className=" pr-10 ">
                  {data2?.Media?.endDate && (
                    <div>
                      <h2 className="pb-1">End date</h2>
                      <div>
                        {data2?.Media?.endDate.day &&
                        data2.Media.endDate.month &&
                        data2.Media.endDate.year
                          ? `${data2.Media.endDate.day}/${data2.Media.endDate.month}/${data2.Media.endDate.year}`
                          : "end date not available"}
                      </div>
                    </div>
                  )}
                </div>
                <div className=" pr-10 ">
                  <h2 className="pb-1">Season</h2>
                  {data2?.Media?.season}
                  {data2?.Media?.seasonYear}
                </div>
                <div className=" pr-10 ">
                  <h2 className="pb-1">Average Score</h2>
                  {data2?.Media?.averageScore}%
                </div>
                <div className=" pr-10 ">
                  <h2 className="pb-1">Mean Score</h2>
                  {data2?.Media?.meanScore}%
                </div>
                <div className=" pr-10 ">
                  <h2 className="pb-1">Popularity</h2>
                  {data2?.Media?.popularity}
                </div>
                <div className=" pr-10 ">
                  <h2 className="pb-1">Favorite</h2>
                  {data2?.Media?.favourites}
                </div>
                <div className=" pr-10 ">
                  <h2 className="pb-1">Studio</h2>
                  {data2?.Media?.studios?.nodes?.slice(0, 1).map((studio) => (
                    <div key={studio?.name}>
                      <p> {studio?.name}</p>
                    </div>
                  ))}
                </div>
                <div className=" pr-10 ">
                  <h2 className="pb-1">Source</h2>
                  {data2?.Media?.source}
                </div>
                <div className=" pr-10 ">
                  <h2 className="pb-1">Hashtag</h2>
                  {data2?.Media?.hashtag}
                </div>
                <div className=" pr-10 ">
                  <h2 className="pb-1">Genres</h2>
                  <div className="flex flex-row">
                    {data2?.Media?.genres?.map((genre) => (
                      <div key={genre}> {genre} </div>
                    ))}
                  </div>
                </div>
                <div className=" pr-10 ">
                  <h2 className="pb-1">Romaji</h2>
                  {data2?.Media?.title?.romaji}
                </div>
                <div className=" pr-10 ">
                  <h2 className="pb-1">English</h2>
                  {data2?.Media?.title?.english}
                </div>
                <div className=" pr-10 ">
                  <h2 className="pb-1">Native</h2>
                  {data2?.Media?.title?.native}
                </div>
                <div className=" pr-10 ">
                  <h2 className="pb-1">Synonyms</h2>
                  <div className="flex flex-row">
                    {data2?.Media?.synonyms?.map((synonym) => (
                      <div key={synonym}> {synonym} </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-[repeat(1,_1fr)] my-10">
              <h1>Characters</h1>
              {/* <div className="grid grid-cols-6"> */}
              <div className="col-span-6 grid  xl:grid-cols-2 pt-2 gap-2">
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
                    <Card
                      key={index}
                      className=" text-xs flex justify-between "
                    >
                      <div className="flex">
                        <img
                          src={anime?.node?.image?.large || ""}
                          alt={anime?.node?.name?.full || ""}
                          className="w-16 rounded-l-sm "
                        />
                        <div>
                          <p>{anime?.node?.name?.full || ""}</p>
                          <p> {anime?.role} </p>
                        </div>
                      </div>
                      {anime!.voiceActors!.length > 0 && (
                        <div className=" flex  ">
                          <div className="pt-1 pb-1">
                            <h3 className="pb-5  font-light">
                              {anime!.voiceActors![0]!.name!.full}
                            </h3>
                            <p className=" text-gray-500">
                              {anime!.voiceActors![0]!.languageV2}
                            </p>
                          </div>
                          <img
                            src={anime!.voiceActors![0]!.image!.large || ""}
                            alt={anime!.voiceActors![0]!.name!.full || ""}
                            className="w-16 rounded-r-sm"
                          />
                        </div>
                      )}
                    </Card>
                  ))}
              </div>
            </div>
            <div>
              <h2>Relations</h2>
              <div className="w-64 pt-2">
                {data2?.Media?.relations?.nodes?.map((relation) => (
                  <Card key={relation?.id}>
                    <div className="flex ">
                      {" "}
                      <img
                        src={relation?.coverImage?.medium || ""}
                        alt={relation?.title?.english || ""}
                        className="w-24 h-28 rounded-l-sm "
                      />{" "}
                      <div className="flex flex-col gap-2 text-sm pl-2">
                        <h4 className="text-blue-400 pt-2">Source</h4>
                        <p>
                          {relation?.title?.english ||
                            relation?.title?.native ||
                            relation?.title?.romaji}
                        </p>
                        <div className="flex flex-row gap-2 pt-5 text-xs text-gray-500">
                          <p> {relation?.type}</p>
                          <p> {relation?.status} </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            <div className="my-10">
              <h2>Staff</h2>
              <div className="grid grid-cols-[repeat(1,_1fr)] gap-2 pt-2">
                {data2?.Media?.staff?.edges &&
                  Array.from(
                    new Map(
                      data2.Media.staff.edges.map((staff) => [
                        staff?.node?.name?.full,
                        staff,
                      ])
                    ).values()
                  )
                    .slice(0, 4)
                    .map((staff, index) => {
                      return (
                        <Card key={index} className="">
                          <div className="flex">
                            <img
                              src={staff?.node?.image?.medium || ""}
                              alt={staff?.node?.name?.full || ""}
                              className="w-16 h-20 rounded-l-sm"
                            />
                            <div className="flex flex-col gap-6 pl-2 pt-4 text-xs ">
                              <p>{staff?.node?.name?.full}</p>
                              <p>{staff?.role}</p>
                            </div>
                          </div>
                        </Card>
                      );
                    })}
              </div>
            </div>
            <div className="my-10">
              <h2>Tags</h2>
              <div className="pt-2">
                {data2?.Media?.tags?.map((tag) => (
                  <Card
                    key={tag?.id}
                    className="flex flex-row justify-between px-2 py-1 text-gray-500 mb-2 "
                  >
                    <p>{tag?.name}</p>
                    <p>{tag?.rank}%</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaPage;
