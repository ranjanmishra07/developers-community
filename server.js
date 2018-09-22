const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport")

const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");
const users = require("./routes/api/users");

//body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//db connection
const db = require("./config/keys").mongoURI;

mongoose
  .connect(db)
  .then(() => {
    console.log("MongoDb connected");
  })
  .catch(e => console.log('mongo db from server.js error', e));

//passport middleware
app.use(passport.initialize())
//passport config
require("./config/passport")(passport);
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
