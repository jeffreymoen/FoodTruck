import { createSchema } from "graphql-yoga";
import {
  typeDef as Location,
  resolvers as locationResolvers,
} from "./models/locations.js";
import _ from "lodash";

const queries = `#graphql
    type Query {
        hello: String
    }
`;

const resolvers = {
  Query: {
    hello: () => "Yoga working",
  },
};

// Load schema & resolvers into GraphQL
export const schema = createSchema({
  typeDefs: [queries, Location],
  resolvers: _.merge(resolvers, locationResolvers),
});
