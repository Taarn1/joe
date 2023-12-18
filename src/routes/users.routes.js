const express = require("express");
const usersController = require("../controllers/users.controller");
const matchFunction = require("../models/match.js");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

router.post("/login", jsonParser, (req, res) =>
  usersController.login(req, res)
);

router.post("/signup", jsonParser, (req, res) =>
  usersController.signUp(req, res)
);

router.get("/getUser/:id", (req, res) => usersController.getUser(req, res));

//match
router.get("/match/:userid", (req, res) => usersController.findMatch(req, res));

router.get("/getMatches/:userid", (req, res) =>
  usersController.getMatches(req, res)
);

router.get("/authenticate", (req, res) => usersController.authenticate(req, res));

router.get("orders", (req, res) => usersController.orders(req, res));  

module.exports = router;
