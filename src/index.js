//express boilerplate code
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const http = require('http');
const socketIO = require('socket.io');
const port = 3000;
const app = express();
const cors = require("cors");


// socket.io server er i tvivl om jeg skal bruge express eller https
const server = http.createServer(app);
const io = socketIO(server);

//import routes
const userRoutes = require("./routes/users.routes");
const pageRoutes = require("./routes/page.routes");

//middleware
app.use(cors());
app.use("/user", userRoutes);
app.use("/", pageRoutes);

server.listen(port, () => console.log(`Server running on port ${port}`));

//socket.io
let connectedUsers = [];

io.on('connection', (socket) => {
  socket.on("joined", (data) => {
    connectedUsers.push(data);
    console.log(connectedUsers);
    socket.emit("users", connectedUsers);
  });
  socket.on('private message', (msg) => {
    io.to(socket.id).emit("private message", msg);
    console.log('message: ' + msg);
  });
  socket.on('disconnecting', (reason) => {
    console.log(socket.id + " disconnected because of " + reason);
    //remove user from connectedUsers with socket.id
    connectedUsers = connectedUsers.filter(user => user.socketid !== socket.id);
  });
});
