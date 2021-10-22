const mongoose = require("mongoose");

const URI =
  "mongodb+srv://carney:Codesmith123@cluster0.pymml.mongodb.net/Find+SQL?retryWrites=true&w=majority";

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "Find+SQL",
  })
  .then(() => {
    console.log("Mongo connected");
  })
  .catch((err) => {
    console.log(err);
  });

const Schema = mongoose.Schema;

const User = new Schema({
  username: { type: String, required: true },
});
