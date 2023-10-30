const express = require("express");
const path = require("path");
const Router = express.Router();

//forside/login
Router.get("/", (req, res) => 
  res.sendFile(path.join(__dirname, "../../client/pages/login.html")));

//sign up
Router.get("/signup", (req, res) => 
  res.sendFile(path.join(__dirname, "../../client/pages/signup.html")));

//joinroom
Router.get("/joinroom", (req, res) => 
  res.sendFile(path.join(__dirname, "../../client/pages/joinroom.html")));
//chat
Router.get("/chat", (req, res) => 
  res.sendFile(path.join(__dirname, "../../client/pages/chat.html")));
Router.get("/chat.js", (req, res) =>
  res.sendFile(path.join(__dirname, "../../client/scripts/chat.js")));

module.exports = Router;