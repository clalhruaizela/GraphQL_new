import { Card } from "@/components/ui/card";
import { GET_PAGE_ANIME_MEDIA } from "@/graphql/get_anime_by_id/cardDetailMedia";
import graphqlClient from "@/graphql/getGraphqlClient";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { formatTimeUntilAiring } from "../utilties/formatTimeUntilAiring";
import { Button } from "@/components/ui/button";

const MediaPage = () => {
  const graphql = graphqlClient();
  const { id } = useParams();
  const [isExpanded, setIsExpanded] = useState(false);

  const { isLoading, isError, data } = useQuery({
    queryKey: [`pageAnimeMedia`, id],

    queryFn: async () => {
      const animeId = parseInt(id!);
      return await graphql.request(GET_PAGE_ANIME_MEDIA, {
        id: animeId,
      });
    },
    enabled: !!id,
  });

  const toggelExpand = () => {
    setIsExpanded(!isExpanded);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  const trailer = data?.Media?.trailer;

  const trailerUrl =
    trailer?.site === "youtube"
      ? `https://www.youtube.com/embed/${trailer?.id}`
      : null;
  // console.log("Trailer URL:", trailer);
  return (
    <div className="w-full h-full">
      <div className="flex flex-col">
        {data?.Media?.bannerImage && (
          <div className="relative">
            <img
              src={data?.Media?.bannerImage || ""}
              alt={data?.Media?.title?.english || ""}
              className="object-cover w-full h-52 md:h-96 "
            />
          </div>
        )}
        <div className="w-full grid  md:grid-cols-12 gap-8">
          <div className=" relative -mt-20  md:-mt-28 md:col-span-4 lg:ml-4 lg:col-span-3">
            <div className="grid grid-cols-8 md:flex md:flex-col w-full gap-5 items-end  static pl-6 ">
              <p className="md:col-span-4 w-60 ">
                {data?.Media?.coverImage?.large && (
                  <img
                    src={data?.Media?.coverImage?.large || ""}
                    className={`${
                      data?.Media?.bannerImage
                        ? "static  md:w-full  xl:left-96 xl:top-80  lg:left-56 lg:top-48 "
                        : ""
                    }`}
                  />
                )}
              </p>
              <div className="gap-1 md:col-span-4 flex flex-row ">
                <div className="items-center">
                  <Button variant={"default"}> Add To List </Button>
                </div>
                <div>
                  <Button variant={"destructive"}>Love</Button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 md:mt-6 hidden md:col-span-6 lg:col-span-9 md:block">
            <div className="text-gray-600  pl-16 md:pl-0 md:px-4 lg:">
              <h1 className="font-bold text-xl ">
                {data?.Media?.title?.english || ""}
              </h1>
              <p
                className={` overflow-hidden gap-4 ${
                  isExpanded
                    ? "max-h-full"
                    : "max-h-24 md:max-h-72 lg:max-h-60 "
                } transition-all duration-300 `}
                onClick={toggelExpand}
              >
                {data?.Media?.description
                  ?.replace(/<br\s*\/?>/gi, "\n")
                  .split("\n")
                  .map((line, index) => (
                    <p key={index}>{line} </p>
                  ))}
              </p>
            </div>
          </div>
        </div>
        <div className=" bg-gray-100  md:grid md:grid-cols-12 px-4   md:gap-8 mt-10  ">
          <div className=" md:col-span-4 mx-6">
            <div className=" mx-auto py-4 mt-4 md:mt-20 md:grid  bg-white text-black text-nowrap flex flex-row justify-center md:justify-start  overflow-x-auto  ">
              <div className="w-full  text-gray-500 font-medium items-center  flex md:flex-col md:px-4 md:gap-4 md:items-start whitespace-nowrap md:whitespace-normal text-xs ">
                <div className=" pr-10   ">
                  <h2 className="pb-1">Airing</h2>
                  {data?.Media?.airingSchedule?.edges
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
                  {data?.Media?.format}
                </div>
                <div className=" pr-10 ">
                  <h2 className="pb-1">Episodes</h2>
                  {data?.Media?.episodes}
                </div>
                <div className=" pr-10 ">
                  <h2 className="pb-1">Duration</h2>
                  {data?.Media?.duration}
                </div>
                <div className=" pr-10 ">
                  <h2 className="pb-1">Status</h2>
                  {data?.Media?.status}
                </div>
                <div className=" pr-10 ">
                  {data?.Media?.startDate && (
                    <div>
                      <h2 className="pb-1">Start date</h2>
                      <div>
                        {data?.Media?.startDate.day &&
                        data.Media.startDate.month &&
                        data.Media.startDate.year
                          ? `${data.Media.startDate.day}/${data.Media.startDate.month}/${data.Media.startDate.year}`
                          : "start date not available"}
                      </div>
                    </div>
                  )}
                </div>
                <div className=" pr-10 ">
                  {data?.Media?.endDate && (
                    <div>
                      <h2 className="pb-1">End date</h2>
                      <div>
                        {data?.Media?.endDate.day &&
                        data.Media.endDate.month &&
                        data.Media.endDate.year
                          ? `${data.Media.endDate.day}/${data.Media.endDate.month}/${data.Media.endDate.year}`
                          : "end date not available"}
                      </div>
                    </div>
                  )}
                </div>
                <div className=" pr-10 ">
                  <h2 className="pb-1">Season</h2>
                  {data?.Media?.season}
                  {data?.Media?.seasonYear}
                </div>
                <div className=" pr-10 ">
                  <h2 className="pb-1">Average Score</h2>
                  {data?.Media?.averageScore}%
                </div>
                <div className=" pr-10 ">
                  <h2 className="pb-1">Mean Score</h2>
                  {data?.Media?.meanScore}%
                </div>
                <div className=" pr-10 ">
                  <h2 className="pb-1">Popularity</h2>
                  {data?.Media?.popularity}
                </div>
                <div className=" pr-10 ">
                  <h2 className="pb-1">Favorite</h2>
                  {data?.Media?.favourites}
                </div>
                <div className=" pr-10 ">
                  <h2 className="pb-1">Studio</h2>
                  {data?.Media?.studios?.nodes?.slice(0, 1).map((studio) => (
                    <div key={studio?.name}>
                      <p> {studio?.name}</p>
                    </div>
                  ))}
                </div>
                <div className=" pr-10 ">
                  <h2 className="pb-1">Source</h2>
                  {data?.Media?.source}
                </div>
                <div className=" pr-10 ">
                  <h2 className="pb-1">Hashtag</h2>
                  <p className="md:">{data?.Media?.hashtag}</p>
                </div>
                <div className=" pr-10 ">
                  <h2 className="pb-1">Genres</h2>
                  <div className="flex flex-row md:flex-col">
                    {data?.Media?.genres?.map((genre) => (
                      <div key={genre}> {genre} </div>
                    ))}
                  </div>
                </div>
                <div className=" pr-10 ">
                  <h2 className="pb-1">Romaji</h2>
                  {data?.Media?.title?.romaji}
                </div>
                <div className=" pr-10 ">
                  <h2 className="pb-1">English</h2>
                  {data?.Media?.title?.english}
                </div>
                <div className=" pr-10 ">
                  <h2 className="pb-1">Native</h2>
                  {data?.Media?.title?.native}
                </div>
                <div className=" pr-10 ">
                  <h2 className="pb-1">Synonyms</h2>
                  <div className="flex flex-row md:flex-col  ">
                    {data?.Media?.synonyms?.map((synonym) => (
                      <div key={synonym}> {synonym} </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="my-10 md:col-span-4 ">
              <h2>Tags</h2>
              <div className="pt-2">
                {data?.Media?.tags?.map((tag) => (
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
          {/* </div> */}

          <div className="text-gray-500 mt-24 md:hidden">
            <h2 className="font-semibold">Description</h2>
            <div className="bg-white px-4 py-2 mt-2 text-sm">
              <p
                className={` lg:overflow-hidden gap-4 lg:${
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
          <div className="md:col-span-8 md:mx-4">
            <div className="text-sm mt-12 ">
              <h2>Relations</h2>
              <div className="w-64 md:w-full pt-3">
                {data?.Media?.relations?.nodes?.map((relation) => (
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
            <div className="grid md:col-span-10  grid-cols-[repeat(1,_1fr)] my-10">
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

            <div className="my-10 md:col-span-10">
              <h2>Staff</h2>
              <div className="grid grid-cols-[repeat(1,_1fr)] gap-2 pt-2">
                {data?.Media?.staff?.edges &&
                  Array.from(
                    new Map(
                      data.Media.staff.edges.map((staff) => [
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
            <div className="my-10 md:col-span-10">
              <h2>Trailer</h2>
              <div className="pt-2 ">
                {trailerUrl ? (
                  <div className="w-full max-w-2xl   h-60 ">
                    <iframe
                      src={trailerUrl}
                      title="YouTube"
                      className="w-full h-full rounded-sm shadow-lg"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <p>No trailer available</p>
                )}
              </div>
            </div>
            <div className="md:col-span-10">
              <div>
                <h2>Recommendations</h2>
                <div className="whitespace-nowrap justify-between   grid grid-flow-col   overflow-x-scroll gap-8  pt-2">
                  {data?.Media?.recommendations?.edges?.map(
                    (recommendation) => (
                      <div key={recommendation?.node?.mediaRecommendation?.id}>
                        <div className="flex flex-col w-36 py-2 ">
                          <img
                            src={
                              recommendation?.node?.mediaRecommendation
                                ?.coverImage?.large || ""
                            }
                            alt={
                              recommendation?.node?.mediaRecommendation?.title
                                ?.english || ""
                            }
                            className="w-40 h-44 rounded-sm shadow-lg"
                          />

                          <p className=" text-sm pt-2  w-40  overflow-scroll ">
                            {recommendation?.node?.mediaRecommendation?.title
                              ?.english ||
                              recommendation?.node?.mediaRecommendation?.title
                                ?.native ||
                              recommendation?.node?.mediaRecommendation?.title
                                ?.romaji}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 text-white flex ">
          <div>
            <div>
              <h2>Site Theme</h2>
              <div>hi</div>
            </div>
          </div>
        </div>
      </div>
      //{" "}
    </div>
  );
};

export default MediaPage;
