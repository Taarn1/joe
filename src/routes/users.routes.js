const express = require("express");
const usersController = require("../controllers/users.controller");
const router = express.Router();

router.post("/login", (req, res) => usersController.login(req, res));

router.get("/logout", (req, res) => usersController.logout(req, res));

router.post("/signup", (req, res) => usersController.signUp(req, res));

router.get("/getUser/:id", (req, res) => usersController.getUser(req, res));

router.put("/update/:id", (req, res) => usersController.updateUser(req, res));
router.delete("/delete/:id", (req, res) =>
  usersController.deleteUser(req, res)
);

module.exports = router;
