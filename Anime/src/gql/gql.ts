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
    "\n  query getTrend($page: Int, $perPage: Int = 10) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo {\n        perPage\n      }\n      media(sort: TRENDING_DESC) {\n        coverImage {\n          large\n        }\n        title {\n          english\n        }\n      }\n    }\n  }\n": types.GetTrendDocument,
    "\n  query getAnimeId($page: Int, $perPage: Int = 30, $format: MediaFormat) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo {\n        total\n        perPage\n        currentPage\n        lastPage\n        hasNextPage\n      }\n\n      media(\n        type: ANIME\n        format: $format\n        sort: TRENDING_DESC\n        status: RELEASING\n      ) {\n        id\n        coverImage {\n          extraLarge\n          large\n          medium\n          color\n        }\n        title {\n          english\n          native\n          romaji\n          userPreferred\n        }\n        airingSchedule {\n          edges {\n            node {\n              timeUntilAiring\n              episode\n            }\n          }\n        }\n        averageScore\n        status\n        format\n        duration\n        genres\n        season\n        seasonYear\n        episodes\n        description\n      }\n    }\n  }\n": types.GetAnimeIdDocument,
    "\n  query searchAime($search: String!) {\n    Page {\n      media(search: $search, type: ANIME) {\n        id\n        coverImage {\n          large\n        }\n        title {\n          english\n          romaji\n        }\n      }\n    }\n  }\n": types.SearchAimeDocument,
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
export function graphql(source: "\n  query getTrend($page: Int, $perPage: Int = 10) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo {\n        perPage\n      }\n      media(sort: TRENDING_DESC) {\n        coverImage {\n          large\n        }\n        title {\n          english\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getTrend($page: Int, $perPage: Int = 10) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo {\n        perPage\n      }\n      media(sort: TRENDING_DESC) {\n        coverImage {\n          large\n        }\n        title {\n          english\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getAnimeId($page: Int, $perPage: Int = 30, $format: MediaFormat) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo {\n        total\n        perPage\n        currentPage\n        lastPage\n        hasNextPage\n      }\n\n      media(\n        type: ANIME\n        format: $format\n        sort: TRENDING_DESC\n        status: RELEASING\n      ) {\n        id\n        coverImage {\n          extraLarge\n          large\n          medium\n          color\n        }\n        title {\n          english\n          native\n          romaji\n          userPreferred\n        }\n        airingSchedule {\n          edges {\n            node {\n              timeUntilAiring\n              episode\n            }\n          }\n        }\n        averageScore\n        status\n        format\n        duration\n        genres\n        season\n        seasonYear\n        episodes\n        description\n      }\n    }\n  }\n"): (typeof documents)["\n  query getAnimeId($page: Int, $perPage: Int = 30, $format: MediaFormat) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo {\n        total\n        perPage\n        currentPage\n        lastPage\n        hasNextPage\n      }\n\n      media(\n        type: ANIME\n        format: $format\n        sort: TRENDING_DESC\n        status: RELEASING\n      ) {\n        id\n        coverImage {\n          extraLarge\n          large\n          medium\n          color\n        }\n        title {\n          english\n          native\n          romaji\n          userPreferred\n        }\n        airingSchedule {\n          edges {\n            node {\n              timeUntilAiring\n              episode\n            }\n          }\n        }\n        averageScore\n        status\n        format\n        duration\n        genres\n        season\n        seasonYear\n        episodes\n        description\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query searchAime($search: String!) {\n    Page {\n      media(search: $search, type: ANIME) {\n        id\n        coverImage {\n          large\n        }\n        title {\n          english\n          romaji\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query searchAime($search: String!) {\n    Page {\n      media(search: $search, type: ANIME) {\n        id\n        coverImage {\n          large\n        }\n        title {\n          english\n          romaji\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;