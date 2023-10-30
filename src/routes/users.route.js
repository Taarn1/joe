const express = require("express");
const path = require("path");
const userRoute = express.Router();

/* fra 2. semester
const router = express.Router();
const usersController = require("../controllers/users.controller");
*/

let id = 1;
let db = [];

// endpoints
userRoute.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/pages/login.html"));
});

userRoute.get("/login.js", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/scripts/login.js"));
});
userRoute.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/pages/register.html"));
});

userRoute.get("/register.js", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/scripts/register.js"));
});

userRoute.get("/global.css", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/styles/global.css"));
});

userRoute
  .get("/user", (req, res) => {
    res.send(db);
  })
  .post("/user", (req, res) => {
    let data = req.body;
    let user = {};
    user = data;
    user.id = id;
    id++;
    db.push(user);
    res.send("User added");
  })
  .get("/user/:id", (req, res) => {
    let response = "";
    let i = 0;
    while (i < db.length) {
      if (req.params.id == db[i].id) {
        response = db[i];
        break;
      }
      i++;
      if (i == db.length) {
        response = "User not found";
      }
    }
    res.send(response);
  })
  .delete("/user/:id", (req, res) => {
    let response = "";
    let i = 0;
    while (i < db.length) {
      if (req.params.id == db[i].id) {
        response = `User with ID ${db[i].id} deleted`;
        db.splice(i, 1);
        // res.send(db[i])
        break;
      }
      i++;
      if (i == db.length) {
        response = "User not found";
      }
    }
    res.send(response);
  })
  .post("/login", (req, res) => {
    //Log in here
    let login = req.body;
    let response = "";
    let i = 0;
    while (i < db.length) {
      if (
        login.username == db[i].username &&
        login.password == db[i].password
      ) {
        response = "Login successful";
        break;
      }
      i++;
      if (i == db.length) {
        response = "Login failed";
      }
    }
    res.send(response);
  });

/* fra 2. semester 
router.post("/login", (req, res) => usersController.login(req, res));

router.get("/logout", (req, res) => usersController.logout(req, res));

router.post("/signup", (req, res) => usersController.signUp(req, res));

router.get("/getUser/:id", (req, res) => usersController.getUser(req, res));

router.put("/update/:id", (req, res) => usersController.updateUser(req, res));
router.delete("/delete/:id", (req, res) =>
  usersController.deleteUser(req, res)
);
*/

module.exports = userRoute;
