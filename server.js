const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');


const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  app.listen({ port: 3000 }, () =>
    console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`)
  );
}

startApolloServer(typeDefs, resolvers);
