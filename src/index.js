//modules
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const path = require("path");
const http = require('http');
const socketIO = require('socket.io');
const cors = require("cors");
const { sqlHandler } = require("./models/sqlHandler");

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
sqlHandler(`select * from matches`).then((result) => {
    // Store the result of the query in the matches variable
    // Set up a connection event with the socket
    io.on('connection', (socket) => {
      // For each match, do the following
      result.forEach(match => {
        // Create a room name based on the match id
        const roomName = match.match_id;
        socket.join(roomName); // Join the socket to the room
        // Set up an event for receiving a message from the client for a specific room
        socket.on(`sendMessage_${roomName}`, (message) => {  
          // Send the message to everyone in the room
          socket.to(roomName).emit(`receivedMessage_${roomName}`, message);
        });
      });
    });
});