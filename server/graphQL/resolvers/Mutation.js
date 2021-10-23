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
  return newUser;
}

async function login(parent, args) {
  const user = await models.User.findOne({ email: args.email });
  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }

  // const token = jwt.sign({id : newUser._id}, APPSECRET);
  return user;
}
async function addProject(parent, args) {
  //find user through email,
  const user = await models.User.findById({ _id: args._id });
  //if user doesnt exist throw error

  if (!user) {
    throw new Error("User not found");
  }
  if (user.projects.length === 0) {
    const project = await models.Project.create({
      databaseURI: args.databaseURI,
      databaseQuery: args.databaseQuery,
      user_id: args._id,
    });

    if (!project) {
      throw new Error("Project not found");
    }

    //push new string into project
    user.projects.push(project);
    await user.save();
  } else {
    console.log("here");
  }
  const updatedUser = await models.User.findById({ _id: args._id });
  console.log(updatedUser.projects);
  return updatedUser;
}

module.exports = {
  signup,
  login,
  addProject,
};
