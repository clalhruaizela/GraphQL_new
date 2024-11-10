import { graphql } from "@/gql";

export const GET_ANIME_MEDIA_CHAR_VOICE = graphql(`
  query getAnimeCharactersAndVoiceActors($id: Int!) {
    Media(id: $id, type: ANIME) {
      bannerImage
      coverImage {
        large
        medium
      }
      description
      title {
        romaji
        english
        native
      }
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
`);
