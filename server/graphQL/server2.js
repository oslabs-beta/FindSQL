const { ApolloServer } = require("apollo-server");
const fs = require("fs");
const path = require("path");

const projectMaster = {
  databaseURI: "heeeeeyoo",
  databaseQueries: ["ffsfd", "sdfdfd", "divndk"],
};
// 1
const users = {
  username: "Carney23",
  firstname: "Carney",
  lastname: "Bernard",
  password: "eufbwdejukfbdjkl",
  projects: [
    {
      databaseURI: "wwww.findone.com",
      databaseQueries: ["FIND sql WHERE join at fknkf", "JOIN LEFT OUTER"],
    },
    projectMaster,
  ],
};

const ALLUSERS = [users];

// 2
const resolvers = {
  Query: {
    profile: () => ALLUSERS[0],
    projects: (parent, args) => {
      if (!args.username) return "Userid not found";
      for (let user of ALLUSERS) {
        if (args.username === user.username) {
          return user.projects;
        }
      }
      return "could not find data";
    },
    fullProfile: (parent, args) => {
      for (const profile of ALLUSERS) {
        if (profile.username === args.username) {
          return profile;
        }
      }
      return "cannot find";
    },
  },

  Mutation: {
    addProject: (parent, args) => {},
  },
};

// 3
const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
