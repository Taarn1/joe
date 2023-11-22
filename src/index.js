//express boilerplate code
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const port = 3000;
const app = express();

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

//import routes
const userRoutes = require("./routes/users.routes");
const pageRoutes = require("./routes/page.routes"); 

app.use("/user", userRoutes);
app.use("/", pageRoutes);

app.get("/global.css", (req, res) => 
  res.sendFile(path.join(__dirname, "../client/styles/global.css")))

app.listen(port, () => console.log(`Joe app listening on port ${port}!`));
