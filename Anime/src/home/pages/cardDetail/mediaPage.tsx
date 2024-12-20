import { Card } from "@/components/ui/card";
import { GET_PAGE_ANIME_MEDIA } from "@/graphql/get_anime_by_id/cardDetailMedia";
import graphqlClient from "@/graphql/getGraphqlClient";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/ui/layout/Layout";
import { formatTimeUntilAiring } from "@/home/utilties/reUse/formatTimeUntilAiring";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { Languages } from "lucide-react";

const MediaPage = () => {
  const graphql = graphqlClient();
  const [selectedLanguages, setSelectedLanguages] = useState("Japanese");
  // const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams();
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

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

  const handleSuggestionClick = (id: number, title: string) => {
    const formatTitle = title.replace(/[\s/]+/g, "-");
    setTimeout(() => {
      window.scrollTo(0, 0);
      navigate(`/home/${id}/${formatTitle}`);
    });
  };

  const toggelExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // const filteredCharaters = (selectLanguage: string) => {
  //   const updateLanguage = selectedLanguages.includes(selectLanguage)
  //     ? selectedLanguages.filter((lang) => lang !== selectLanguage)
  //     : [...selectedLanguages, selectLanguage];
  //   setSelectedLanguages(updateLanguage);
  //   setSearchParams({ lang: updateLanguage.join(",") });
  // };

  // if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  const trailer = data?.Media?.trailer;

  const trailerUrl =
    trailer?.site === "youtube"
      ? `https://www.youtube.com/embed/${trailer?.id}`
      : null;
  // console.log("Trailer URL:", trailer);

  return (
    <Layout>
      <div className="w-full h-full">
        <div className="flex flex-col">
          {data?.Media?.bannerImage && (
            <div className="relative">
              <img
                src={data?.Media?.bannerImage || ""}
                alt={data?.Media?.title?.english || ""}
                className="object-cover w-full aspect-[3/1.7] md:aspect-[2.2] lg:aspect-[3/1] xl:aspect-[3/1] 2xl:aspect-[6/1.1] "
              />
            </div>
          )}
          <div className="w-full grid  md:grid-cols-12 gap-0 md:gap-8 xl:">
            <div className=" relative mt-2  md:-mt-28 xl:-mt-14 2xl:-mt-36 md:col-span-4 lg:ml-4 lg:col-span-3 xl:col-span-3  ">
              <div className="grid grid-cols-8 md:flex md:flex-col w-full gap-5 items-end  static px-4  xl:ml-7">
                <div className="col-span-4 size-full xl:w-60  ">
                  {data?.Media?.coverImage?.large && (
                    <img
                      src={data?.Media?.coverImage?.large || ""}
                      className={`${
                        data?.Media?.bannerImage
                          ? " w-full h-full object-cover aspect-[2.5/3] xl:aspect-[1/1.5] rounded-sm -mt-4 "
                          : " mt-24 lg:mt-56 rounded-sm md:mt-32 xl:mt-44 2xl:mt-64 "
                      }`}
                    />
                  )}
                </div>
                <div
                  className={`${
                    data?.Media?.bannerImage
                      ? "gap-1 col-span-4 md:pl-20 flex flex-row mb-4"
                      : "gap-1 col-span-4 md:pl-20 flex flex-row  "
                  }`}
                >
                  <div className="items-center">
                    <Button variant={"default"}> Add To List </Button>
                  </div>
                  <div>
                    <Button variant={"destructive"}>Love</Button>
                  </div>
                </div>
              </div>
            </div>
            {/* dangerously */}
            <div
              className={`${
                data?.Media?.bannerImage
                  ? "mt-10  md:mt-6  md:col-span-6 lg:col-span-9 xl:col-span-6 lg:block xl:block md:block"
                  : "mt-20 lg:mt-28 md:col-span-6 lg:col-span-9 xl:col-span-6 lg:block xl:block md:block xl:mt-32"
              }`}
            >
              <div className="text-gray-600  pl-6 md:pl-0 md:px-4 lg:text-sm xl:pl-4">
                <h1 className="font-bold text-xl md:pb-4 ">
                  {data?.Media?.title?.english ||
                    data?.Media?.title?.romaji ||
                    ""}
                </h1>
                <div className="hidden md:block lg:block xl:block">
                  <div
                    className={` overflow-hidden gap-4 ${
                      isExpanded
                        ? "max-h-full"
                        : "max-h-24 md:max-h-72 lg:max-h-60 xl:max-h-52"
                    } transition-all duration-300 `}
                    onClick={toggelExpand}
                    dangerouslySetInnerHTML={{
                      __html: data?.Media?.description || "",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <Tabs defaultValue="Overview" className=" ">
            <TabsList className=" justify-evenly align-end justify-self-center pt-2 lg:pt-10 bg-white flex gap-2 lg:gap-36 ">
              <TabsTrigger value="Overview">Overview</TabsTrigger>
              <TabsTrigger value="Characters">Characters</TabsTrigger>
              <TabsTrigger value="Staff">Staff</TabsTrigger>
            </TabsList>

            <div className=" bg-gray-100  md:grid md:grid-cols-12 xl:grid-cols-9 px-4    md:gap-8 mt-4  ">
              <div className=" md:col-span-4 xl:mx-0 xl:col-span-2  md:mx-6">
                <div className=" mx-auto py-4 mt-4 md:mt-20 md:grid xl:ml-24 2xl:ml-72 xl:w-44 bg-white  text-black text-nowrap flex flex-row justify-center md:justify-start  overflow-x-auto  ">
                  <div className="w-full  text-gray-500 font-medium items-center  flex md:flex-col md:px-4 md:gap-4 md:items-start whitespace-nowrap md:whitespace-normal text-xs ">
                    <div className=" pr-10   ">
                      <h2 className="pb-1">Airing</h2>
                      {data?.Media?.airingSchedule?.edges
                        ?.filter(
                          (anime) => (anime?.node?.timeUntilAiring ?? 0) > 0
                        )
                        .slice(0, 1)
                        .map((anime, index) => (
                          <div key={index} className=" text-blue-600 ">
                            <span>
                              <>Ep</>
                              {anime?.node?.episode}:
                            </span>
                            <span>
                              {formatTimeUntilAiring(
                                anime?.node?.timeUntilAiring ?? 0
                              )}
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
                      {data?.Media?.studios?.nodes
                        ?.slice(0, 1)
                        .map((studio) => (
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
                <div className="my-10 md:col-span-4  xl:w-44 xl:ml-24 2xl:ml-72 xl:text-xs ">
                  <h2>Tags</h2>
                  <div className="pt-2">
                    {data?.Media?.tags?.map((tag) => (
                      <Card
                        key={tag?.id}
                        className="flex flex-row justify-between px-2 py-1 text-gray-500 mb-2 bg-white "
                      >
                        <p>{tag?.name}</p>
                        <p>{tag?.rank}%</p>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              {/* </div> */}
              <TabsContent
                value="Overview"
                className="md:col-span-8 xl:col-span-6"
              >
                <div className="text-gray-500 mt-24 md:hidden">
                  <h2 className="font-semibold">Description</h2>
                  <div className="bg-white px-4 py-2 mt-2 text-sm">
                    <div
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
                    </div>
                  </div>
                </div>
                <div className="md:col-span-9 xl:col-span-6   mt-12 ">
                  {data?.Media?.relations?.nodes &&
                    data?.Media?.relations?.nodes?.length > 0 && (
                      <div>
                        <h2>Relations</h2>
                        <div className=" md:w-full md:col-span-9 xl:grid-cols-7 2xl:grid-cols-10   md:whitespace-normal  pt-3 whitespace-nowrap justify-between xl:justify-normal md:overflow-auto overflow-x-scroll xl:overflow-visible gap-4 grid  grid-flow-col md:[grid-auto-flow:initial]">
                          {data?.Media?.relations?.nodes?.map((relation) => (
                            <Card
                              key={relation?.id}
                              className=" xl:col-span-1  "
                              onClick={() => {
                                if (
                                  relation?.id !== undefined &&
                                  relation?.title !== undefined
                                ) {
                                  handleSuggestionClick(
                                    relation.id,
                                    relation!.title!.english ||
                                      relation!.title!.native ||
                                      relation!.title!.romaji ||
                                      "Unknown Title"
                                  );
                                }
                              }}
                            >
                              <div className="flex flex-row   w-full   xl:flex-col   ">
                                <div className="w-24  md:w-40 lg:w-28 xl:w-28 ">
                                  <img
                                    src={
                                      relation?.coverImage?.large ||
                                      relation?.coverImage?.medium ||
                                      ""
                                    }
                                    alt={relation?.title?.english || ""}
                                    className="w-full h-full aspect-[2/1] md:aspect-[2/1.8] object-cover xl:aspect-[2/2.5] rounded-l-sm xl:rounded-l-none"
                                  />
                                </div>
                                <div className="flex flex-col gap-2 text-xs pl-2 xl:pl-0 w-40  md:w-full xl:w-28 xl:-mt-6   overflow-hidden">
                                  <h4 className="text-blue-400 w-full xl:bg-gray-800/70 xl:flex xl:justify-center xl:items-center xl:text-white py-1 ">
                                    {data.Media?.source}
                                  </h4>
                                  <p className="xl:hidden">
                                    {relation?.title?.english ||
                                      relation?.title?.native ||
                                      relation?.title?.romaji}
                                  </p>
                                  <div className="flex flex-row xl:hidden gap-2 pt-5 text-xs text-gray-500">
                                    <p> {relation?.type}</p>
                                    <p> {relation?.status} </p>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}
                  <div className="grid md:col-span-10   my-10">
                    <h1>Characters</h1>
                    <div className=" grid  grid-cols-6 pt-2 gap-2 xl:gap-10">
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
                            className=" text-xs flex justify-between col-span-6 xl:col-span-3 "
                          >
                            <div className="flex  h-20  ">
                              <div className="w-20  h-full">
                                <img
                                  src={
                                    anime?.node?.image?.large ||
                                    anime?.node?.image?.medium ||
                                    ""
                                  }
                                  alt={anime?.node?.name?.full || ""}
                                  className="w-full h-full object-cover aspect-[2/1] md:aspect-[3/1] lg: rounded-l-sm "
                                />
                              </div>
                              <div className="justify-between py-2 pl-2 flex flex-col">
                                <p>{anime?.node?.name?.full || ""}</p>
                                <p> {anime?.role} </p>
                              </div>
                            </div>
                            {anime!.voiceActors!.length > 0 && (
                              <div className=" flex ">
                                <div className=" flex text-right flex-col justify-between pr-2  py-2">
                                  <p>{anime!.voiceActors![0]!.name!.full}</p>
                                  <p className=" text-gray-500 justify-end flex">
                                    {anime!.voiceActors![0]!.languageV2}
                                  </p>
                                </div>
                                <div className="w-20 h-full">
                                  <img
                                    src={
                                      anime!.voiceActors![0]!.image!.large ||
                                      anime!.voiceActors![0]!.image!.medium ||
                                      ""
                                    }
                                    alt={
                                      anime!.voiceActors![0]!.name!.full || ""
                                    }
                                    className="w-full h-full object-cover aspect-[2/1] md:aspect-[3/1] rounded-r-sm"
                                  />
                                </div>
                              </div>
                            )}
                          </Card>
                        ))}
                    </div>
                  </div>

                  <div className="my-10 md:col-span-10">
                    <h2>Staff</h2>
                    <div className="grid grid-cols-8 gap-2 pt-2 xl:gap-10">
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
                              <Card
                                key={index}
                                className="col-span-8 xl:col-span-4"
                              >
                                <div className="flex">
                                  <div className="w-20 h-full">
                                    <img
                                      src={staff?.node?.image?.medium || ""}
                                      alt={staff?.node?.name?.full || ""}
                                      className="w-full h-full aspect-[1/1] rounded-l-sm"
                                    />
                                  </div>
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
                  {trailerUrl && (
                    <div className="my-10 md:col-span-10">
                      <h2>Trailer</h2>
                      <div className="pt-2 ">
                        <div className="w-full max-w-2xl xl:max-w-lg h-60 ">
                          <iframe
                            src={trailerUrl}
                            title="YouTube"
                            className="w-full h-full rounded-sm shadow-lg"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="md:col-span-10">
                    <div>
                      <h2>Recommendations</h2>
                      <div className=" justify-between   grid grid-flow-col   overflow-x-scroll gap-8  pt-2">
                        {data?.Media?.recommendations?.edges?.map(
                          (recommendation) => (
                            <div
                              key={
                                recommendation?.node?.mediaRecommendation?.id
                              }
                              onClick={() => {
                                const mediaId =
                                  recommendation?.node?.mediaRecommendation?.id;
                                const mediaTitle =
                                  recommendation?.node?.mediaRecommendation
                                    ?.title?.english || "Unknown Title";

                                if (mediaId !== undefined) {
                                  handleSuggestionClick(mediaId, mediaTitle);
                                }
                              }}
                            >
                              <div className="flex flex-col w-36  py-2 ">
                                <img
                                  src={
                                    recommendation?.node?.mediaRecommendation
                                      ?.coverImage?.large ||
                                    recommendation?.node?.mediaRecommendation
                                      ?.coverImage?.medium ||
                                    ""
                                  }
                                  alt={
                                    recommendation?.node?.mediaRecommendation
                                      ?.title?.english || ""
                                  }
                                  className="w-full h-full aspect-[2/3] rounded-sm shadow-lg"
                                />
                                <div>
                                  <div className=" flex items-center justify-center pt-2 text-center w-36 text-xs   ">
                                    {recommendation?.node?.mediaRecommendation
                                      ?.title?.english ||
                                      recommendation?.node?.mediaRecommendation
                                        ?.title?.native ||
                                      recommendation?.node?.mediaRecommendation
                                        ?.title?.romaji}
                                  </div>{" "}
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent
                value="Characters"
                className="md:col-span-8 mt-12 xl:col-span-6"
              >
                <div className="">
                  <div className=" flex justify-end">
                    <Select
                      onValueChange={(value) => setSelectedLanguages(value)}
                    >
                      <SelectTrigger className="w-52 ">
                        <SelectValue placeholder="Japanese" />
                      </SelectTrigger>

                      {data?.Media?.characters?.edges &&
                        (() => {
                          // Collect unique languages from the voice actors
                          const availableLanguages = Array.from(
                            new Set(
                              data.Media.characters.edges.flatMap((anime) =>
                                anime?.voiceActors?.map(
                                  (actor) => actor?.languageV2
                                )
                              )
                            )
                          ).filter((language): language is string =>
                            Boolean(language)
                          ); // Ensure no undefined values

                          // Only display the select content if there are available languages
                          return availableLanguages.length > 0 ? (
                            <SelectContent>
                              {availableLanguages.map((language) => (
                                <SelectItem key={language} value={language}>
                                  {language}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          ) : null;
                        })()}
                    </Select>
                  </div>
                  <div className="col-span-6 grid  xl:grid-cols-8 pt-2 gap-2 xl:gap-10">
                    {data?.Media?.characters?.edges?.flatMap((anime) =>
                      anime?.voiceActors
                        ?.filter(
                          (actor) => actor?.languageV2 === selectedLanguages
                        )
                        ?.map((voiceActor) => (
                          <Card
                            key={`${anime?.node?.id}-${voiceActor?.id}`}
                            className="text-xs  xl:col-span-4 "
                          >
                            <div className="grid grid-cols-6  ">
                              <div className="col-span-3  xl:col-span-3 flex ">
                                <div className="w-20">
                                  <img
                                    src={anime?.node?.image?.large || ""}
                                    alt={anime?.node?.name?.full || ""}
                                    className="w-full h-full object-cover aspect-[2/1] rounded-l-sm "
                                  />
                                </div>
                                <div className="justify-between py-2 pl-2 flex flex-col">
                                  <p>{anime?.node?.name?.full || ""}</p>
                                  <p> {anime?.role} </p>
                                </div>
                              </div>
                              <div
                                className=" flex col-span-3 justify-end "
                                key={voiceActor?.id}
                              >
                                <div className=" flex flex-col justify-between text-right pr-2 py-2">
                                  <h3>{voiceActor?.name?.full}</h3>
                                  <p className=" text-gray-500 justify-end flex">
                                    {voiceActor?.languageV2}
                                  </p>
                                </div>
                                <div className="w-14 lg:w-20 h-full ">
                                  <img
                                    src={voiceActor!.image!.large || ""}
                                    alt={voiceActor!.name!.full || ""}
                                    className="w-full h-full aspect-[1/1] rounded-r-sm"
                                  />
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))
                    )}
                  </div>
                </div>
              </TabsContent>
              <TabsContent
                value="Staff"
                className="my-10 md:col-span-8 mt-12 xl:col-span-6"
              >
                <div className="grid grid-cols-8 gap-2 pt-2 xl:gap-10">
                  {data?.Media?.staff?.edges
                    ?.filter((staff) => staff?.node?.languageV2 === "Japanese") // Filter Japanese language staff
                    ?.reduce(
                      (uniqueStaff: typeof data.Media.staff.edges, staff) => {
                        // Deduplicate staff by name
                        const exists = uniqueStaff.find(
                          (s) => s?.node?.name?.full === staff?.node?.name?.full
                        );
                        if (!exists) uniqueStaff.push(staff);
                        return uniqueStaff;
                      },
                      [] as typeof data.Media.staff.edges
                    )
                    ?.map((staff, index) => (
                      <Card
                        key={index}
                        className="col-span-8 xl:col-span-4 w-full"
                      >
                        <div className="flex ">
                          <div className="w-20  h-full">
                            <img
                              src={staff?.node?.image?.medium || ""}
                              alt={staff?.node?.name?.full || ""}
                              className="w-full h-full aspect-[2/3] rounded-l-sm"
                            />
                          </div>
                          <div className="flex flex-col  pl-2  text-xs justify-evenly ">
                            <p>{staff?.node?.name?.full}</p>
                            <p>{staff?.role}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            </div>
          </Tabs>
          <div className="bg-slate-800 text-white flex ">
            <div>
              <div>
                <h2>Site Theme</h2>
                <div>hi</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MediaPage;
