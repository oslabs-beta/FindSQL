const models = require("../database.js");
const bcrypt = require("bcrypt");
const { model } = require("mongoose");
//mutation functionality to create/update/delete a user, create / update/delete a project

async function signup(parent, args) {
  const password = await bcrypt.hash(args.password, 10);

  const newUser = await models.User.create({
    email: args.email,
    password: password,
  });

  // const token = jwt.sign({id : newUser._id}, APPSECRET);
  return {
    user: newUser,
  };
}

async function login(parent, args) {
  const user = await models.User.findOne({ email: args.email });
  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }

  // const token = jwt.sign({id : newUser._id}, APPSECRET);
  return {
    user,
  };
}
async function addProject(parent, args) {
  //find user through email,
  const user = await models.User.findOne({ _id: args._id });
  //if user doesnt exist throw error
  if (user.length === 0) {
    throw new Error("User not found");
  }

  const project = await models.User.projects.findOne({ databaseURI: args.uri });
  if (project.length === 0) {
    throw new Error("Project not found");
  }

  //push new string into project
  project.databaseQueries.push(args.databaseQuery);

  return {
    user,
  };
}

module.exports = {
  signup,
  login,
  addProject,
};
