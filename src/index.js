//express boilerplate code
const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const path = require("path");

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

//import routes
const testRoutes = require("./routes/example");
const userRoute = require("./routes/users.route");
//use routes on /test
app.use("/test", testRoutes);

app.use("/", userRoute);

//forside/login
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/pages/login.html"));
});

//sign up
app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/pages/signup.html"));
});

//joinroom
app.get("/joinroom", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/pages/joinroom.html"));
});
//chat
app.get("/chat", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/pages/chat.html"));
});

app.get("/global.css", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/styles/global.css"));
});

app.listen(port, () => console.log(`Joe app listening on port ${port}!`));
