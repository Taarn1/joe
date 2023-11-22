const express = require("express");
const usersController = require("../controllers/users.controller");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

router.post("/login", (req, res) => usersController.login(req, res));

router.get("/logout", (req, res) => usersController.logout(req, res));

router.post("/signup", jsonParser, (req, res) =>
  usersController.signUp(req, res)
);

router.get("/getUser/:id", (req, res) => usersController.getUser(req, res));

router.put("/update/:id", (req, res) => usersController.updateUser(req, res));

module.exports = router;
