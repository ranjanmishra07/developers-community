const express = require("express");
const mongoose = require("mongoose");

const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");
const users = require("./routes/api/users");

const app = express();

//db connection
const db = require("./config/keys").mongoURI;

mongoose
  .connect(db)
  .then(() => {
    console.log("MongoDb connected");
  })
  .catch(e => console.log(e));

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/api/profile", profile);
app.use("/api/users", users);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
