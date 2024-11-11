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
      relations {
        nodes {
          id
          status
          type
          coverImage {
            medium
          }
          title {
            romaji
            english
            native
            userPreferred
          }
        }
      }
      tags {
        id
        name
        rank
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
      staff {
        edges {
          id
          role
          node {
            name {
              full
            }
            image {
              large
              medium
            }
          }
        }
      }
      recommendations {
        edges {
          node {
            id
          }
        }
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
