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
      bannerImage
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
            large
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
        large
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
      trailer {
        id
        site
        thumbnail
      }
      recommendations {
        edges {
          node {
            mediaRecommendation {
              id
              title {
                romaji
                english
                native
              }
              coverImage {
                large
                medium
              }
            }
          }
        }
      }
      format
      duration
      genres
      season
      description
      seasonYear
      episodes
      characters {
        edges {
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
          voiceActors(language: JAPANESE) {
            name {
              full
            }
            image {
              large
            }
            languageV2
          }
        }
      }
    }
  }
  # query getAnimeCharactersAndVoiceActors($id: Int!) {
  #   Media(id: $id, type: ANIME) {
  #     bannerImage
  #     coverImage {
  #       large
  #       medium
  #     }
  #     description
  #     title {
  #       romaji
  #       english
  #       native
  #     }
  #     characters {
  #       edges {
  #         role
  #         node {
  #           name {
  #             full
  #           }
  #           image {
  #             large
  #             medium
  #           }
  #         }
  #         voiceActors(language: JAPANESE) {
  #           name {
  #             full
  #           }
  #           image {
  #             large
  #           }
  #           languageV2
  #         }
  #       }
  #     }
  #   }
`);
