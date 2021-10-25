const models = require("../database.js");

async function getProfile(parent, args) {
  const user = await models.User.findOne({ _id: args._id, email: args.email });
  if (!user) {
    throw new Error("User not found");
  }

  return user;
}

async function getProjects(parent, args) {
  const user = await models.User.findOne({ email: args.email });
  console.log(user);
  if (!user) {
    throw new Error("User not found");
  }

  const projects = user.projects;

  return projects;
}
module.exports = { getProfile, getProjects };
