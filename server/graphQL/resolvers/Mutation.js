const models = require("../database.js");
const bcrypt = require("bcryptjs");
const { model } = require("mongoose");
const { isCompositeType } = require("graphql");
const APP_SECRET = "OSP_DARREN_JUNE_ANTHONY_CARNEY";
const jwt = require("jsonwebtoken");
//mutation functionality to create/update/delete a user, create / update/delete a project

async function signup(parent, args) {
  const checkUser = await models.User.findOne({ email: args.email });

  if (checkUser) {
    throw new Error(
      "Account already exists. Please login or use another email"
    );
  }

  const password = await bcrypt.hash(args.password, 10);

  const newUser = await models.User.create({
    email: args.email,
    password: password,
  });

  const token = jwt.sign({ id: newUser._id }, APP_SECRET);
  return {
    user: newUser,
    token: token,
    loggedIn: true,
  };
}

async function login(parent, args, res) {
  const user = await models.User.findOne({ email: args.email });

  if (!user) {
    throw new Error(
      "Email address not found. Please try again or use new email address."
    );
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid password. Please try again");
  }

  const token = jwt.sign({ id: user._id }, APP_SECRET);

  return {
    user: user,
    token: token,
    loggedIn: true,
  };
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
      user_id: args._id,
    });

    if (!project) {
      throw new Error("Project not found");
    }

    //push new string into project
    project.databaseQueries.push(args.databaseQuery);
    await project.save();
    user.projects.push(project);
    await user.save();
  } else {
    const updatedProject = await models.Project.findOne({
      user_id: args._id,
      databaseURI: args.databaseURI,
    });
    if (updatedProject.databaseQueries.includes(args.databaseQuery)) {
      throw new Error(
        "Query already already stored. Please create a new query"
      );
    }
    updatedProject.databaseQueries.push(args.databaseQuery);
    await updatedProject.save();
  }
  const updatedUser = await models.User.findById({ _id: args._id });
  const resultProjects = [];
  for (let prj of updatedUser.projects) {
    const result = await models.Project.findById({ _id: prj });
    resultProjects.push(result);
  }
  const projectObj = { projects: resultProjects };
  const finalUserObj = Object.assign(updatedUser, projectObj);
  return finalUserObj;
}

async function deleteProject(parent, args) {
  const project = await models.Project.findOneAndDelete({
    user_id: args.user_id,
    databaseURI: args.databaseURI,
  });

  if (!project) {
    throw new Error(
      "Project was not found. Please choose another project to delete if that's what you'd like to do"
    );
  }

  const user = await models.User.findById({ _id: args.user_id });
  const resultProjects = [];
  for (let prj of updatedUser.projects) {
    const result = await models.Project.findById({ _id: prj });
    resultProjects.push(result);
  }
  const projectObj = { projects: resultProjects };
  const finalUserObj = Object.assign(user, projectObj);
  return finalUserObj;
}

async function checkTokenAuth(parent, args) {
  const { token } = args;

  if (token) {
    const verify = jwt.verify(token, APP_SECRET);

    if (verify) {
      const getIdFromToken = jwt.decode(token);

      const user = await models.User.findById({ _id: getIdFromToken.id });

      return {
        user,
        token,
        loggedIn: true,
      };
    } else {
      throw new Error("Please send a valid Authentication Token");
    }
  } else {
    throw new Error("Please send a valid Authentication Token");
  }
  return userHasBeenLoggedIn;
}

module.exports = {
  signup,
  login,
  addProject,
  deleteProject,
  checkTokenAuth,
};
