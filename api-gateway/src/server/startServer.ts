import { ApolloServer } from "apollo-server-express";
import formatGraphQLErrors from "../helpers/formatGraphQLErrors";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import resolvers from "../graphql/resolvers";
import config from "../config/default";
import schema from "../graphql/schema";
import injectSession from "./middleware/injectSession";
import helmet from "helmet";

const startServer = () => {
  const apolloServer = new ApolloServer({
    context: (a) => a,
    formatError: formatGraphQLErrors,
    resolvers,
    typeDefs: schema,
  });

  const app = express();
  app.use(cookieParser());

  app.use(
    cors({
      credentials: true,
      origin: (origin, cb) => cb(null, true),
    })
  );

  apolloServer.applyMiddleware({ app, path: "/graphql", cors: false });

  app.use(injectSession);

  app.listen({ port: config.PORT }, () => {
    console.log(`🚀  Server ready at ${config.PORT}`);
  });
};

export default startServer;
