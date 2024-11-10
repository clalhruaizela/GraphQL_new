export interface AnimeMediaData {
  Media: {
    airingSchedule: {
      edges: {
        node: {
          timeUntilAiring: number;
          episode: number;
        };
      }[];
    };
    title: {
      english: string;
      native: string;
      romaji: string;
    };
    startDate: {
      year: number;
      month: number | string;
      day: number;
    };
    endDate: {
      year: number;
      month: number | string;
      day: number;
    };
    coverImage: {
      extraLarge: string;
    };
    averageScore: number;
    meanScore: number;
    popularity: number;
    favourites: number;
    status: "RELEASING" | "NOT_YET_RELEASED" | "ENDED";
    format:
      | "TV"
      | "TV_SHORT"
      | "MOVIE"
      | "SPECIAL"
      | "OVA"
      | "ONA"
      | "MUSIC"
      | "MANGA"
      | "NOVEL"
      | "ONE_SHOT";
    episodes: number;
    duration: number;
  };
}
