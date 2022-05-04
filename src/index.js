const express = require("express");
var bodyParser = require("body-parser");

const route = require("./routes/route");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://Abhijith:Abhijith@cluster0.w7nwz.mongodb.net/groupXDatabase?authSource=admin&replicaSet=atlas-darc46-shard-0&readPreference=primary&ssl=true",
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log(err));

app.use("/", route);

app.listen(process.env.PORT || 4000, function () {
  console.log("Express app is running on " + " " + (process.env.PORT || 4000));
});
