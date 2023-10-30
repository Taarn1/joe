//express boilerplate code
const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

//import routes
const testRoutes = require("./routes/example");
//use routes on /test
app.use("/test", testRoutes);

//forside
app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Joe app listening on port ${port}!`));
