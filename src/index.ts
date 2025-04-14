import "reflect-metadata";
import { datasource } from "./datasource";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { CountriesResolver } from "./resolvers/Countries";

async function initialize() {
  await datasource.initialize();
  console.info("Datasource is connected 🔌");

  const schema = await buildSchema({
    resolvers: [CountriesResolver],
  });
  console.info("Schema is built 📜");

  const server = new ApolloServer({
    schema,
  });
  console.info("Apollo server is created 🚀");

  const { url } = await startStandaloneServer(server, {
    listen: { port: 5000 },
  });
  console.info(`GraphQL server is running on port ${url} 🌐`);
}
initialize();
