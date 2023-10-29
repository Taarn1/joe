const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");

// endpoints
router.post("/login", (req, res) => usersController.login(req, res));

router.get("/logout", (req, res) => usersController.logout(req, res));

router.post("/signup", (req, res) => usersController.signUp(req, res));

router.get("/getUser/:id", (req, res) => usersController.getUser(req, res));

router.put("/update/:id", (req, res) => usersController.updateUser(req, res));
router.delete("/delete/:id", (req, res) =>
  usersController.deleteUser(req, res)
);

router.post("/categories", (req, res) =>
  usersController.favoriteCategories(req, res)
);

router.post("/read", (req, res) => usersController.readArticles(req, res));

router.post("/favoriteArticles", (req, res) =>
  usersController.favoriteArticles(req, res)
);

router.get("/getFavoriteArticles", (req, res) =>
  usersController.getFavoriteArticles(req, res)
);

module.exports = router;
