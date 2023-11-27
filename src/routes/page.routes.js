const express = require("express");
const path = require("path");
const Router = express.Router();

//forside/login
Router.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../../client/pages/login.html"))
);
Router.get("/login.js", (req, res) => 
  res.sendFile(path.join(__dirname, "../../client/scripts/login.js"))
);
//sign up
Router.get("/signup", (req, res) =>
  res.sendFile(path.join(__dirname, "../../client/pages/signup.html"))
);
Router.get("/signup.js", (req, res) =>
  res.sendFile(path.join(__dirname, "../../client/scripts/signup.js"))
);

//profile
Router.get("/profile", (req, res) =>
  res.sendFile(path.join(__dirname, "../../client/pages/profile.html"))
);


//joinroom
Router.get("/joinroom", (req, res) =>
  res.sendFile(path.join(__dirname, "../../client/pages/joinroom.html"))
);

//chat
Router.get("/chat", (req, res) =>
  res.sendFile(path.join(__dirname, "../../client/pages/chat.html"))
);
Router.get("/chat.js", (req, res) =>
  res.sendFile(path.join(__dirname, "../../client/scripts/chat.js"))
);
Router.get("/chat.css", (req, res) => 
res.sendFile(path.join(__dirname, "../../client/styles/chat.css"))
);

// CSS for alle siderne
Router.get("/global.css", (req, res) =>
  res.sendFile(path.join(__dirname, "../../client/styles/global.css"))
);

module.exports = Router;
