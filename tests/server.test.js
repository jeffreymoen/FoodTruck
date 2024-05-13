import { createSchema, createYoga } from "graphql-yoga";
import { buildHTTPExecutor } from "@graphql-tools/executor-http";

const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      greetings: String!
    }
  `,
  resolvers: {
    Query: {
      greetings: () => "Hello World!",
    },
  },
});

const yoga = createYoga({ schema });

const executor = buildHTTPExecutor({
  fetch: yoga.fetch,
});
