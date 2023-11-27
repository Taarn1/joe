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

server.listen(port, () => {
  console.log(`Server kører på port ${port}`);
});

io.on('connection', (socket) => {
  socket.on('chat message', function (msg) {
    console.log(msg)
    const uidTo = msg.uidTo 
    io.in(uidTo).emit('chat message', msg )
    });
  });
