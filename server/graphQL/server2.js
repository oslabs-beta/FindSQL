const { ApolloServer } = require("apollo-server");
const fs = require("fs");
const path = require("path");
const Query = require("./resolvers/Query.js");
const Mutation = require("./resolvers/Mutation");
// 2
const resolvers = {
  Query,
  Mutation,
};

// 3
const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
