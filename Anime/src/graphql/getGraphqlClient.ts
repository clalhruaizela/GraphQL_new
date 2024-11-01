import { GraphQLClient } from "graphql-request";

const graphqlClient = () => {
  let queryClientInstance: GraphQLClient | null = null;
  queryClientInstance = new GraphQLClient("https://graphql.anilist.co", {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return queryClientInstance;
};
export default graphqlClient;
