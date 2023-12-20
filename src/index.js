//modules
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const path = require("path");
const http = require('http');
const socketIO = require('socket.io');
const cors = require("cors");
const { sqlHandler } = require("./models/sqlHandler");

//express and socket.io setup
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

//import routes
const userRoutes = require("./routes/users.routes");
const pageRoutes = require("./routes/page.routes");

//middleware
app.use(cors());
app.use(cookieParser());
app.use("/user", userRoutes);
app.use("/", pageRoutes);

server.listen(3000, () => console.log(`Server running on port ${3000}`));

//socket.io
//might look weird but if ain broke
let s
//loads all matches
sqlHandler(`select * from matches`).then((result) => {
    s = result
    // Set up a connection event with the socket
    io.on('connection', (socket) => {
      // For each match, do the following
      s.forEach(match => {
        // Create a room name based on the match id
        const roomName = match.match_id;
        socket.join(roomName); // Join the socket to the room
        // Set up an event for receiving a message from the client for a specific room
        socket.on(`sendMessage_${roomName}`, (message) => {  
          // Send the message to everyone in the room
          //socket.emit is different than io.emit
          //socket doesn't send the message back to the sender
          socket.to(roomName).emit(`receivedMessage_${roomName}`, message);
        });
      });
    });
});