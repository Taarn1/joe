const express = require("express");
const Router = express.Router();
const path = require("path");

//frontpage
Router.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../../client/pages/login.html"))
);
//login
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

Router.get("/profile.js", (req, res) =>
  res.sendFile(path.join(__dirname, "../../client/scripts/profile.js"))
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

// CSS for all pages
Router.get("/global.css", (req, res) =>
  res.sendFile(path.join(__dirname, "../../client/styles/global.css"))
);

module.exports = Router;
