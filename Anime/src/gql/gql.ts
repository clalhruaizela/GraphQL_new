/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  query getAnimeCharactersAndVoiceActors($id: Int!) {\n    Media(id: $id, type: ANIME) {\n      bannerImage\n      coverImage {\n        large\n        medium\n      }\n      description\n      title {\n        romaji\n        english\n        native\n      }\n      characters {\n        edges {\n          role\n          node {\n            name {\n              full\n            }\n            image {\n              large\n              medium\n            }\n          }\n          voiceActors(language: JAPANESE) {\n            name {\n              full\n            }\n            image {\n              large\n            }\n            languageV2\n          }\n        }\n      }\n    }\n  }\n": types.GetAnimeCharactersAndVoiceActorsDocument,
    "\n  query getAnimeId(\n    $id: Int\n    $search: String\n    $page: Int\n    $perPage: Int\n    $format: MediaFormat\n    $genres: [String]\n    $status: MediaStatus\n    $isAdult: Boolean = false\n    $sort: [MediaSort]\n    $season: MediaSeason\n  ) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo {\n        hasNextPage\n        total\n      }\n      media(\n        id: $id\n        search: $search\n        type: ANIME\n        format: $format\n        sort: $sort\n        status: $status\n        isAdult: $isAdult\n        genre_in: $genres\n        season: $season\n      ) {\n        id\n        coverImage {\n          extraLarge\n          large\n          medium\n          color\n        }\n        title {\n          english\n          native\n          romaji\n          userPreferred\n        }\n        airingSchedule {\n          edges {\n            node {\n              timeUntilAiring\n              episode\n            }\n          }\n        }\n\n        averageScore\n        status\n        format\n        duration\n        genres\n        season\n        seasonYear\n        episodes\n        description\n      }\n    }\n  }\n": types.GetAnimeIdDocument,
    "\n  query getAnimeMedia($id: Int!) {\n    Media(id: $id, type: ANIME) {\n      airingSchedule {\n        edges {\n          node {\n            timeUntilAiring\n            episode\n          }\n        }\n      }\n      startDate {\n        day\n        month\n        year\n      }\n      bannerImage\n      endDate {\n        day\n        month\n        year\n      }\n      relations {\n        nodes {\n          id\n          status\n          type\n          coverImage {\n            large\n            medium\n          }\n          title {\n            romaji\n            english\n            native\n            userPreferred\n          }\n        }\n      }\n      tags {\n        id\n        name\n        rank\n      }\n      source\n      averageScore\n      meanScore\n      popularity\n      favourites\n      studios {\n        nodes {\n          name\n          isAnimationStudio\n        }\n      }\n      hashtag\n      synonyms\n      coverImage {\n        medium\n        large\n      }\n      status\n      title {\n        english\n        native\n        romaji\n      }\n      staff {\n        edges {\n          id\n          role\n          node {\n            name {\n              full\n            }\n            image {\n              large\n              medium\n            }\n          }\n        }\n      }\n      trailer {\n        id\n        site\n        thumbnail\n      }\n      recommendations {\n        edges {\n          node {\n            mediaRecommendation {\n              id\n              title {\n                romaji\n                english\n                native\n              }\n              coverImage {\n                large\n                medium\n              }\n            }\n          }\n        }\n      }\n      format\n      duration\n      genres\n      season\n      description\n      seasonYear\n      episodes\n      characters {\n        edges {\n          role\n          node {\n            name {\n              full\n            }\n            image {\n              large\n              medium\n            }\n          }\n          voiceActors(language: JAPANESE) {\n            name {\n              full\n            }\n            image {\n              large\n            }\n            languageV2\n          }\n        }\n      }\n    }\n  }\n  # query getAnimeCharactersAndVoiceActors($id: Int!) {\n  #   Media(id: $id, type: ANIME) {\n  #     bannerImage\n  #     coverImage {\n  #       large\n  #       medium\n  #     }\n  #     description\n  #     title {\n  #       romaji\n  #       english\n  #       native\n  #     }\n  #     characters {\n  #       edges {\n  #         role\n  #         node {\n  #           name {\n  #             full\n  #           }\n  #           image {\n  #             large\n  #             medium\n  #           }\n  #         }\n  #         voiceActors(language: JAPANESE) {\n  #           name {\n  #             full\n  #           }\n  #           image {\n  #             large\n  #           }\n  #           languageV2\n  #         }\n  #       }\n  #     }\n  #   }\n": types.GetAnimeMediaDocument,
    "\n  query getSearchAnime($search: String) {\n    Page {\n      media(search: $search, type: ANIME) {\n        id\n        coverImage {\n          extraLarge\n          large\n          medium\n          color\n        }\n        title {\n          english\n          native\n          romaji\n          userPreferred\n        }\n        airingSchedule {\n          edges {\n            node {\n              timeUntilAiring\n              episode\n            }\n          }\n        }\n        averageScore\n        status\n        format\n        duration\n        genres\n        season\n        seasonYear\n        episodes\n        description\n      }\n    }\n  }\n": types.GetSearchAnimeDocument,
    "\n  query getFilterAnime($genre: [String!]) {\n    Page {\n      media(genre_in: $genre, type: ANIME) {\n        id\n        genres\n        title {\n          english\n          native\n          romaji\n          userPreferred\n        }\n        coverImage {\n          extraLarge\n          large\n          medium\n          color\n        }\n        airingSchedule {\n          edges {\n            node {\n              timeUntilAiring\n              episode\n            }\n          }\n        }\n        averageScore\n        status\n        format\n        duration\n        genres\n        season\n        seasonYear\n        episodes\n        description\n      }\n    }\n  }\n": types.GetFilterAnimeDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getAnimeCharactersAndVoiceActors($id: Int!) {\n    Media(id: $id, type: ANIME) {\n      bannerImage\n      coverImage {\n        large\n        medium\n      }\n      description\n      title {\n        romaji\n        english\n        native\n      }\n      characters {\n        edges {\n          role\n          node {\n            name {\n              full\n            }\n            image {\n              large\n              medium\n            }\n          }\n          voiceActors(language: JAPANESE) {\n            name {\n              full\n            }\n            image {\n              large\n            }\n            languageV2\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getAnimeCharactersAndVoiceActors($id: Int!) {\n    Media(id: $id, type: ANIME) {\n      bannerImage\n      coverImage {\n        large\n        medium\n      }\n      description\n      title {\n        romaji\n        english\n        native\n      }\n      characters {\n        edges {\n          role\n          node {\n            name {\n              full\n            }\n            image {\n              large\n              medium\n            }\n          }\n          voiceActors(language: JAPANESE) {\n            name {\n              full\n            }\n            image {\n              large\n            }\n            languageV2\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getAnimeId(\n    $id: Int\n    $search: String\n    $page: Int\n    $perPage: Int\n    $format: MediaFormat\n    $genres: [String]\n    $status: MediaStatus\n    $isAdult: Boolean = false\n    $sort: [MediaSort]\n    $season: MediaSeason\n  ) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo {\n        hasNextPage\n        total\n      }\n      media(\n        id: $id\n        search: $search\n        type: ANIME\n        format: $format\n        sort: $sort\n        status: $status\n        isAdult: $isAdult\n        genre_in: $genres\n        season: $season\n      ) {\n        id\n        coverImage {\n          extraLarge\n          large\n          medium\n          color\n        }\n        title {\n          english\n          native\n          romaji\n          userPreferred\n        }\n        airingSchedule {\n          edges {\n            node {\n              timeUntilAiring\n              episode\n            }\n          }\n        }\n\n        averageScore\n        status\n        format\n        duration\n        genres\n        season\n        seasonYear\n        episodes\n        description\n      }\n    }\n  }\n"): (typeof documents)["\n  query getAnimeId(\n    $id: Int\n    $search: String\n    $page: Int\n    $perPage: Int\n    $format: MediaFormat\n    $genres: [String]\n    $status: MediaStatus\n    $isAdult: Boolean = false\n    $sort: [MediaSort]\n    $season: MediaSeason\n  ) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo {\n        hasNextPage\n        total\n      }\n      media(\n        id: $id\n        search: $search\n        type: ANIME\n        format: $format\n        sort: $sort\n        status: $status\n        isAdult: $isAdult\n        genre_in: $genres\n        season: $season\n      ) {\n        id\n        coverImage {\n          extraLarge\n          large\n          medium\n          color\n        }\n        title {\n          english\n          native\n          romaji\n          userPreferred\n        }\n        airingSchedule {\n          edges {\n            node {\n              timeUntilAiring\n              episode\n            }\n          }\n        }\n\n        averageScore\n        status\n        format\n        duration\n        genres\n        season\n        seasonYear\n        episodes\n        description\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getAnimeMedia($id: Int!) {\n    Media(id: $id, type: ANIME) {\n      airingSchedule {\n        edges {\n          node {\n            timeUntilAiring\n            episode\n          }\n        }\n      }\n      startDate {\n        day\n        month\n        year\n      }\n      bannerImage\n      endDate {\n        day\n        month\n        year\n      }\n      relations {\n        nodes {\n          id\n          status\n          type\n          coverImage {\n            large\n            medium\n          }\n          title {\n            romaji\n            english\n            native\n            userPreferred\n          }\n        }\n      }\n      tags {\n        id\n        name\n        rank\n      }\n      source\n      averageScore\n      meanScore\n      popularity\n      favourites\n      studios {\n        nodes {\n          name\n          isAnimationStudio\n        }\n      }\n      hashtag\n      synonyms\n      coverImage {\n        medium\n        large\n      }\n      status\n      title {\n        english\n        native\n        romaji\n      }\n      staff {\n        edges {\n          id\n          role\n          node {\n            name {\n              full\n            }\n            image {\n              large\n              medium\n            }\n          }\n        }\n      }\n      trailer {\n        id\n        site\n        thumbnail\n      }\n      recommendations {\n        edges {\n          node {\n            mediaRecommendation {\n              id\n              title {\n                romaji\n                english\n                native\n              }\n              coverImage {\n                large\n                medium\n              }\n            }\n          }\n        }\n      }\n      format\n      duration\n      genres\n      season\n      description\n      seasonYear\n      episodes\n      characters {\n        edges {\n          role\n          node {\n            name {\n              full\n            }\n            image {\n              large\n              medium\n            }\n          }\n          voiceActors(language: JAPANESE) {\n            name {\n              full\n            }\n            image {\n              large\n            }\n            languageV2\n          }\n        }\n      }\n    }\n  }\n  # query getAnimeCharactersAndVoiceActors($id: Int!) {\n  #   Media(id: $id, type: ANIME) {\n  #     bannerImage\n  #     coverImage {\n  #       large\n  #       medium\n  #     }\n  #     description\n  #     title {\n  #       romaji\n  #       english\n  #       native\n  #     }\n  #     characters {\n  #       edges {\n  #         role\n  #         node {\n  #           name {\n  #             full\n  #           }\n  #           image {\n  #             large\n  #             medium\n  #           }\n  #         }\n  #         voiceActors(language: JAPANESE) {\n  #           name {\n  #             full\n  #           }\n  #           image {\n  #             large\n  #           }\n  #           languageV2\n  #         }\n  #       }\n  #     }\n  #   }\n"): (typeof documents)["\n  query getAnimeMedia($id: Int!) {\n    Media(id: $id, type: ANIME) {\n      airingSchedule {\n        edges {\n          node {\n            timeUntilAiring\n            episode\n          }\n        }\n      }\n      startDate {\n        day\n        month\n        year\n      }\n      bannerImage\n      endDate {\n        day\n        month\n        year\n      }\n      relations {\n        nodes {\n          id\n          status\n          type\n          coverImage {\n            large\n            medium\n          }\n          title {\n            romaji\n            english\n            native\n            userPreferred\n          }\n        }\n      }\n      tags {\n        id\n        name\n        rank\n      }\n      source\n      averageScore\n      meanScore\n      popularity\n      favourites\n      studios {\n        nodes {\n          name\n          isAnimationStudio\n        }\n      }\n      hashtag\n      synonyms\n      coverImage {\n        medium\n        large\n      }\n      status\n      title {\n        english\n        native\n        romaji\n      }\n      staff {\n        edges {\n          id\n          role\n          node {\n            name {\n              full\n            }\n            image {\n              large\n              medium\n            }\n          }\n        }\n      }\n      trailer {\n        id\n        site\n        thumbnail\n      }\n      recommendations {\n        edges {\n          node {\n            mediaRecommendation {\n              id\n              title {\n                romaji\n                english\n                native\n              }\n              coverImage {\n                large\n                medium\n              }\n            }\n          }\n        }\n      }\n      format\n      duration\n      genres\n      season\n      description\n      seasonYear\n      episodes\n      characters {\n        edges {\n          role\n          node {\n            name {\n              full\n            }\n            image {\n              large\n              medium\n            }\n          }\n          voiceActors(language: JAPANESE) {\n            name {\n              full\n            }\n            image {\n              large\n            }\n            languageV2\n          }\n        }\n      }\n    }\n  }\n  # query getAnimeCharactersAndVoiceActors($id: Int!) {\n  #   Media(id: $id, type: ANIME) {\n  #     bannerImage\n  #     coverImage {\n  #       large\n  #       medium\n  #     }\n  #     description\n  #     title {\n  #       romaji\n  #       english\n  #       native\n  #     }\n  #     characters {\n  #       edges {\n  #         role\n  #         node {\n  #           name {\n  #             full\n  #           }\n  #           image {\n  #             large\n  #             medium\n  #           }\n  #         }\n  #         voiceActors(language: JAPANESE) {\n  #           name {\n  #             full\n  #           }\n  #           image {\n  #             large\n  #           }\n  #           languageV2\n  #         }\n  #       }\n  #     }\n  #   }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getSearchAnime($search: String) {\n    Page {\n      media(search: $search, type: ANIME) {\n        id\n        coverImage {\n          extraLarge\n          large\n          medium\n          color\n        }\n        title {\n          english\n          native\n          romaji\n          userPreferred\n        }\n        airingSchedule {\n          edges {\n            node {\n              timeUntilAiring\n              episode\n            }\n          }\n        }\n        averageScore\n        status\n        format\n        duration\n        genres\n        season\n        seasonYear\n        episodes\n        description\n      }\n    }\n  }\n"): (typeof documents)["\n  query getSearchAnime($search: String) {\n    Page {\n      media(search: $search, type: ANIME) {\n        id\n        coverImage {\n          extraLarge\n          large\n          medium\n          color\n        }\n        title {\n          english\n          native\n          romaji\n          userPreferred\n        }\n        airingSchedule {\n          edges {\n            node {\n              timeUntilAiring\n              episode\n            }\n          }\n        }\n        averageScore\n        status\n        format\n        duration\n        genres\n        season\n        seasonYear\n        episodes\n        description\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getFilterAnime($genre: [String!]) {\n    Page {\n      media(genre_in: $genre, type: ANIME) {\n        id\n        genres\n        title {\n          english\n          native\n          romaji\n          userPreferred\n        }\n        coverImage {\n          extraLarge\n          large\n          medium\n          color\n        }\n        airingSchedule {\n          edges {\n            node {\n              timeUntilAiring\n              episode\n            }\n          }\n        }\n        averageScore\n        status\n        format\n        duration\n        genres\n        season\n        seasonYear\n        episodes\n        description\n      }\n    }\n  }\n"): (typeof documents)["\n  query getFilterAnime($genre: [String!]) {\n    Page {\n      media(genre_in: $genre, type: ANIME) {\n        id\n        genres\n        title {\n          english\n          native\n          romaji\n          userPreferred\n        }\n        coverImage {\n          extraLarge\n          large\n          medium\n          color\n        }\n        airingSchedule {\n          edges {\n            node {\n              timeUntilAiring\n              episode\n            }\n          }\n        }\n        averageScore\n        status\n        format\n        duration\n        genres\n        season\n        seasonYear\n        episodes\n        description\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;