const models = require("../database.js");
const bcrypt = require("bcrypt");
const { model } = require("mongoose");
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

module.exports = {
  signup,
  login,
  addProject,
  deleteProject,
};
