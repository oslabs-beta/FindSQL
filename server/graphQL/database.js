const mongoose = require("mongoose");

const URI =
  "mongodb+srv://carney:Rapids15@cluster0.pymml.mongodb.net/findsql?retryWrites=true&w=majority";
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "findsql",
  })
  .then(() => {
    console.log("Mongo connected");
  })
  .catch((err) => {
    console.log(err);
  });

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
});

const projectSchema = new Schema({
  databaseURI: { type: String, required: true },
  databaseQueries: [{ type: String, required: false }],
});

const User = mongoose.model("User", userSchema);
const Project = mongoose.model("Project", projectSchema);

module.exports = { User, Project };
