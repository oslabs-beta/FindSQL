const express = require("express");
const app = express();
const path = require("path");
const PORT = 3000;

const queryController = require("./queryController");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/assets", express.static(path.join(__dirname, "../client/assets")));

app.use("/build", express.static(path.join(__dirname, "../build")));

app.get("/", (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, "../client/index.html"));
});

//get request to a test URL that will Query the tables needed to be pushed to front end
app.post(
  "/test",
  queryController.databaseCreator,
  queryController.getQuery,
  queryController.getAllTables,
  queryController.getKeys,
  (req, res) => {
    const { data } = res.locals;
    res.status(200).send(data);
  }
);
//
//global error object
app.use((err, req, res, next) => {
  const defualtErrorHandle = {
    log: "Error in middlewear function",
    status: 400,
    message: { err: "An error occured" },
  };
  const newErr = Object.assign(defualtErrorHandle, { err: err });
  return res.status(newErr.status).send(newErr.message);
});
//start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

//npx kill-port 3000