//express boilerplate code
const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

//import routes
const testRoutes = require("./routes/example");
const userRoute = require("./routes/users.route");
//use routes on /test
app.use("/test", testRoutes);

app.use("/", userRoute);

//forside
app.get("/", (req, res) => res.send("Hello World!"));

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/pages/home.html"));
});

app.get("/home.js", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/scripts/home.js"));
});

app.get("/global.css", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/styles/global.css"));
});

app.listen(port, () => console.log(`Joe app listening on port ${port}!`));
