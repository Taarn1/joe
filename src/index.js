//express boilerplate code
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
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
app.use(cookieParser());
app.use("/user", userRoutes);
app.use("/", pageRoutes);

server.listen(port, () => console.log(`Server kører på port ${port}`));

    let matches
    sqlHandler(`select * from matches`).then((result) => {
        matches = result
        io.on('connection', (socket) => {
          matches.forEach(match => {
            const roomName = match.match_id;
            
            socket.join(roomName); // Tilslut socket til det specifikke rum
            
            // Modtagelse af besked fra klienten for et bestemt rum
            socket.on(`sendMessage_${roomName}`, (message) => {  
              socket.to(roomName).emit(`receivedMessage_${roomName}`, message); // Sender beskeden til alle i rummet
              console.log({ user: socket.id, sent: message });
            });
          });
        });
        
    })
