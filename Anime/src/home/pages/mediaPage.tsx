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
                    data?.Media?.bannerImage
                      ? "absolute left-96 top-80 lg:left-56 lg:top-48 w-44"
                      : ""
                  }`}
                />
              )}
              <div className="text-gray-600 pl-16 lg:pl-10">
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
        </div>
      </div>
      <div className=" bg-violet-500 w-10/12 mx-20 grid grid-cols-7    mt-8 relative ">
        {/* <div className=""> */}
        <div className=" w-full  text-black flex justify-center mx-8 ">
          <div className="w-full bg-white  flex flex-col justify-center text-xs">
            <div className="  ">
              <h2>Airing</h2>
              {data2?.Media?.airingSchedule?.edges
                ?.filter((anime: any) => anime?.node?.timeUntilAiring > 0)
                .slice(0, 1)
                .map((anime: any, index: number) => (
                  <div key={index} className="border rounded-sm bg-slate-400 ">
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
            <div>
              <h2>Format</h2>
              {data2?.Media?.format}
            </div>
            <div>
              <h2>Episodes</h2>
              {data2?.Media?.episodes}
            </div>
            <div>
              <h2>Duration</h2>
              {data2?.Media?.duration}
            </div>
            <div>
              <h2>Status</h2>
              {data2?.Media?.status}
            </div>
            <div>
              {data2?.Media?.startDate && (
                <div>
                  <h2>Start date</h2>
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
            <div>
              {data2?.Media?.endDate && (
                <div>
                  <h2>End date</h2>
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
            <div>
              <h2>Season</h2>
              {data2?.Media?.season}
              {data2?.Media?.seasonYear}
            </div>
            <div>
              <h2>Average Score</h2>
              {data2?.Media?.averageScore}%
            </div>
            <div>
              <h2>Mean Score</h2>
              {data2?.Media?.meanScore}%
            </div>
            <div>
              <h2>Popularity</h2>
              {data2?.Media?.popularity}
            </div>
            <div>
              <h2>Favorite</h2>
              {data2?.Media?.favourites}
            </div>
            <div>
              <h2>Studio</h2>
              {data2?.Media?.studios?.nodes?.slice(0, 1).map((studio) => (
                <div key={studio?.name}>
                  <p> {studio?.name}</p>
                </div>
              ))}
            </div>
            <div>
              <h2>Source</h2>
              {data2?.Media?.source}
            </div>
            <div>
              <h2>Hashtag</h2>
              {data2?.Media?.hashtag}
            </div>
            <div>
              <h2>Genres</h2>
              {data2?.Media?.genres?.map((genre) => (
                <div key={genre}> {genre} </div>
              ))}
            </div>
            <div>
              <h2>Romaji</h2>
              {data2?.Media?.title?.romaji}
            </div>
            <div>
              <h2>English</h2>
              {data2?.Media?.title?.english}
            </div>
            <div>
              <h2>Native</h2>
              {data2?.Media?.title?.native}
            </div>
            <div>
              <h2>Synonyms</h2>
              {data2?.Media?.synonyms?.map((synonym) => (
                <div key={synonym}> {synonym} </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-">
          <h1>Characters</h1>
          {/* <div className="grid grid-cols-6"> */}
          <div className="col-span-6 grid  xl:grid-cols-2  gap-2">
            {data?.Media?.characters?.edges
              ?.filter(
                (anime) =>
                  (anime?.role === "MAIN" || anime?.role === "SUPPORTING") &&
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
                      <p>{anime?.node?.name?.full || ""}</p>
                      <p> {anime?.role} </p>
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
          {/* </div> */}
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default MediaPage;
