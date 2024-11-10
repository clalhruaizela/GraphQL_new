import { graphql } from "@/gql";

export const GET_PAGE_ANIME_MEDIA = graphql(`
  query getAnimeMedia($id: Int!) {
    Media(id: $id, type: ANIME) {
      airingSchedule {
        edges {
          node {
            timeUntilAiring
            episode
          }
        }
      }
      startDate {
        day
        month
        year
      }
      endDate {
        day
        month
        year
      }
      source
      averageScore
      meanScore
      popularity
      favourites
      studios {
        nodes {
          name
          isAnimationStudio
        }
      }
      hashtag
      synonyms
      coverImage {
        medium
      }
      status
      title {
        english
        native
        romaji
      }
      format
      duration
      genres
      season
      seasonYear
      episodes
    }
  }
`);
