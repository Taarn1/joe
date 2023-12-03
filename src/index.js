//express boilerplate code
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const http = require('http');
const socketIO = require('socket.io');
const port = 3000;
const app = express();
const cors = require("cors");
const { sqlHandler } = require("./models/sqlHandler");


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

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
  /*socket.on("user", async function(name){
    socket.username = name
    io.socket.emit("", "sofie");
    console.log(name)
  })*/
});

server.listen(port, () => console.log(`Server kører på port ${port}`));

/*sqlHandler(`select * from matches`).then((result) => {
    result.forEach(match => {
        const roomName = `match_${match.match_id}`;
      
        // Create a room with the match ID as the room name
      });
    });*/

    let matches
    sqlHandler(`select * from matches`).then((result) => {
        matches = result
        console.log(matches)
        io.on('connection', (socket) => {
          matches.forEach(match => {
            const roomName = match.match_id;
            socket.on(roomName, (message) => {
              io.emit(roomName, message);
              console.log({user: socket.id, sent:message})});
            socket.join(roomName);
          });
        });
    })
