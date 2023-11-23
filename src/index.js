//express boilerplate code
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const port = 3000;
const app = express();
const cors = require("cors");

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

// socket.io server er i tvivl om jeg skal bruge express eller https
const {createServer} = require("http");
const {Server} = require("socket.io");
const httpServer = createServer(app);
const io = new Server(httpServer)

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
  socket.on("user joined", (username) => {
    console.log(username + " joined the chat");
    io.emit("chat message", username + " joined the chat");
  });
});
  
//import routes
const userRoutes = require("./routes/users.routes");
const pageRoutes = require("./routes/page.routes");

//middleware 
app.use(cors());

app.use("/user", userRoutes);
app.use("/", pageRoutes);

httpServer.listen(port, () => console.log(`Joe app listening on port ${port}!`));
