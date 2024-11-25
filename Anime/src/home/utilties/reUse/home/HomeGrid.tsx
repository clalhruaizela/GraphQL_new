import React from "react";
import { SmileOutlined } from "@ant-design/icons";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Skeletons } from "../../skeletion";

interface Anime {
  id: number;
  coverImage?: { large?: string };
  title?: {
    english?: string;
    romaji?: string;
    native?: string;
    userPreferred?: string;
  };
  airingSchedule?: {
    edges: {
      node?: {
        timeUntilAiring?: number;
        episode?: number;
      };
    }[];
  };
  averageScore?: number;
  season?: string;
  seasonYear?: number;
  format?: string;
  episodes?: number;
  genres?: string[];
}

interface AnimeGridProps {
  data?: Anime[];
  isLoading: boolean;
  onCardClick: (id: number, title: string) => void;
  formatTimeUntilAiring: (time: number) => string; // Function to format time
}

const HomeGrid: React.FC<AnimeGridProps> = ({
  data = [],
  isLoading,
  onCardClick,
  formatTimeUntilAiring,
}) => {
  return (
    <div className="col-span-6 grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-5 2xl:grid-cols-6 mx-4 xl:mx-10 gap-2 md:gap-4">
      {isLoading ? (
        <Skeletons amount={5} className="h-72 col-span-1" />
      ) : (
        <>
          {data.map((anime) => (
            <Card
              key={anime?.id}
              className="w-full text-gray-400 hover:text-gray-600"
              onClick={() =>
                onCardClick(anime?.id, anime?.title?.english || "")
              }
            >
              <div className="flex flex-col justify-center items-center mb-2 md:mb-5 h">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger
                      asChild
                      className="relative aspect-ratio-1/1 "
                    >
                      <div className="absolute h-full w-full ">
                        <img
                          src={anime?.coverImage?.large || ""}
                          alt={anime?.title?.english || ""}
                          className="object-cover h-44 md:h-48 xl:h-80 rounded-t-sm w-full"
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="w-80 flex justify-center items-center flex-col py-5">
                      <div>
                        <h2 className="text-gray-800  text-lg font-semibold">
                          {anime?.title?.english ||
                            anime?.title?.romaji ||
                            anime?.title?.native}
                        </h2>
                        {anime?.airingSchedule?.edges
                          ?.filter(
                            (edge) => (edge?.node?.timeUntilAiring ?? 0) > 0
                          )
                          .slice(0, 1)
                          .map((edge, index) => (
                            <div
                              key={index}
                              className="flex py-2 gap-2 font-bold items-center"
                            >
                              <span className="text-lg font-semibold">
                                Ep {edge?.node?.episode}
                              </span>
                              <span className="text-base text-gray-600">
                                airing in{" "}
                                {formatTimeUntilAiring(
                                  edge?.node?.timeUntilAiring ?? 0
                                )}{" "}
                                remaining
                              </span>
                            </div>
                          ))}
                        <div className="flex flex-row gap-1">
                          <p className="text-green-400 text-lg">
                            <SmileOutlined />
                          </p>
                          <p className="font-bold pt-1">
                            {anime?.averageScore}%
                          </p>
                        </div>
                        <div className="flex flex-row gap-2 text-gray-500">
                          <p>{anime?.season}</p>
                          <p>{anime?.seasonYear}</p>
                        </div>
                        <div className="flex flex-row gap-2 pb-2 text-gray-500">
                          <p>{anime?.format} Show</p>
                          <p>{anime?.episodes} episodes</p>
                        </div>
                        <div className="flex flex-row gap-2 flex-wrap pt-2">
                          {anime?.genres?.slice(0, 3).map((genre, index) => (
                            <div
                              key={index}
                              className={`py-1 text-xs font-semibold rounded-xl text-center bg-red-500 text-white w-20`}
                            >
                              {genre}
                            </div>
                          ))}
                        </div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <CardContent className="p-0">
                <div className="text-xs 2xl:w-full md:text-sm md:font-semibold lg:font-medium flex flex-col items-center w-full h-8 md:w-full md:h-10 overflow-hidden  pl-1">
                  <p className=" lg:">
                    {anime?.title?.english ||
                      anime?.title?.romaji ||
                      anime?.title?.native ||
                      anime?.title?.userPreferred}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </>
      )}
    </div>
  );
};
export default HomeGrid;
