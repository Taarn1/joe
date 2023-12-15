const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { sqlHandler } = require("../models/sqlHandler.js");
const matchFunction = require("../models/match.js");


// hash password
const hashPassword = async (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 3, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
};

// set cookie with user and session id
const setCookies = (res, userId) => {
  const sessionId = uuidv4();
  sqlHandler(`INSERT INTO sessions (userid, sessionid) VALUES (?, ?)`, [userId, sessionId]);
  const cookieOptions = {
    httpOnly: false,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    sameSite: "lax",
    path: "/",
  };

  res.cookie("userId", userId, cookieOptions);
  res.cookie("sessionId", sessionId, cookieOptions);
  res.status(200).send({ userId, sessionId });
};

exports.login = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res.status(400).send("Request lacks content");
    }
    // Retrieve hashed password from the database based on the username
    const result = await sqlHandler(
      `SELECT userid, email, password, username FROM users 
      WHERE username = ?`,
      [req.body.username]
    );

    if (result.length > 0) {
      const hashedPasswordDB = result[0].password;
      // Compare the hashed passwords
      const passwordMatch = await bcrypt.compare(
        req.body.password,
        hashedPasswordDB
      );
      if (passwordMatch) {
        const userId = result[0].userid;
        setCookies(res, userId);
      } else {
        console.log(req.body.username + " Incorrect password");
        return res.status(400).send("Incorrect password");
      }
    } else {
      console.log(req.body.username + " User not found");
      return res.status(400).send("User not found");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("An error occurred during login");
  }
};

// opret bruger
exports.signUp = async (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.username) {
    return res.status(400).send("Request lacks content");
  }
  const hashedPassword = await hashPassword(req.body.password);
  //check om mail er i brug
  let check = await sqlHandler(
    `SELECT userid, username, email, password FROM users WHERE email = ? OR username = ?`,
    [req.body.email, req.body.username]
  );
  // hvis check er længere end 0, findes e-mailen allerede
  if (Object.keys(check).length) {
    return res.status(400).send("E-mail or username already in use");
  }
  try {
    // opretter en ny bruger i databasen
    await sqlHandler(
      `INSERT INTO users (username, email, password, age, number, cityid)
      VALUES (?, ?, ?, ?, ?, (SELECT cityid FROM city WHERE cityname = ?))`,
     [
       req.body.username,
       req.body.email,
       hashedPassword,
       req.body.age,
       req.body.number,
       req.body.preferredCity,
     ]
   );
    const result = await sqlHandler(
      `SELECT userid FROM users 
        WHERE username = ?`, 
      [req.body.username]
    );
    const userId = result[0].userid;
    setCookies(res, userId); 
    
    await sqlHandler(`
    INSERT INTO orders (userid, orderid, itemid)
  VALUES (
    (SELECT seq FROM sqlite_sequence WHERE name = 'users'),
    (SELECT COALESCE(MAX(orderid), 0) + 1 FROM orders),
    1
  );
`);


    // kaster en fejl hvis noget uventet går galt
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send("An error occurred while trying to create the user");
  }
};




// Hent bruger
exports.getUser = async (req, res) => {
  //check for user id
  const userId = req.params.id;
  if (!userId) {
    return res.status(400).send("Request lacks content");
  }
  try {
    // finder bruger
    const user = await sqlHandler(
      `SELECT users.userid, users.username, users.email, users.age, users.number, city.cityname
      FROM users
      INNER JOIN city ON users.cityid = city.cityid
      WHERE users.userid = ?`,
      [userId]
    );

    // returner bruger
    return res.status(201).send(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send("An error occurred while trying to get user");
  }
};
// match bruger 
exports.findMatch = async (req, res) => {
  try {
    // finder matches
    const match = await matchFunction.matchFunction(req.params.userid);
    if (match.length === 0) {
      return res
        .status(400)
        .send(
          "No new matches found. You can increase your chances by buying more products"
        );
    }
    if(req.params.id < match[0].userid){
    sqlHandler(`INSERT INTO if not exist matches (user1 user2) VALUES (?, ?)
    `, [Number(match[0].userid), Number(req.params.id)]);} else{
      sqlHandler(`INSERT INTO if not exist matches (user1 user2) VALUES (?, ?)
    `, [Number(req.params.id), Number(match[0].userid)]);
    }

    // returner matches
    return res.status(201).send(match);
  } catch (error) {
    console.error(error);
    return res.status(500).send("An error occurred while trying to match");
  }
};

// virker ikke
exports.getMatches = async (req, res) => {
  try {
    // Check for user id
    if (!req.params.userid) {
      return res.status(400).send("Request lacks content");
    }

    let userId = req.params.userid;

    // Find matches
    sqlHandler(`select 
    users1.username as user1, users2.username as user2, users1.userid as user1Id, users2.userid as user2Id, matches.match_id
    from matches
    JOIN users users1 ON matches.user1 = users1.userId
    JOIN users users2 ON matches.user2 = users2.userId
    where user1 =${userId} or user2 = ${userId}`)
    .then((result) => {
    return res.status(200).send(result);
    });
    // Respond with matches
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send(`An error occurred while trying to get matches: ${error.message}`);
  }
};

exports.authenticate = async (req, res) => {
  console.log(req.cookies);
  if(!req.cookies) {
    return res.status(200).send("No cookies");
  }
    console.log(req.cookies);
    const userId = req.cookies.userId;
    const sessionId = req.cookies.sessionId;

    sqlHandler(
      `SELECT userid, sessionid FROM sessions WHERE userid = ? AND sessionid = ?`,
      [userId, sessionId]
    )
      .then((result) => {
        console.log(result);
        if (result.length > 0) {
          return res.status(200).send("Authenticated");
        } else {
          res.clearCookie("userId");
          res.clearCookie("sessionId");
          return res.status(401).send("Unauthorized");
        }
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).send("An error occurred during authentication");
      });
};

exports.logout = (req, res) => {
  const userId = req.cookies.userId;
  const sessionId = req.cookies.sessionId;

  sqlHandler(`DELETE FROM sessions WHERE userid = ? AND sessionid = ?`, [
    userId,
    sessionId,
  ])
    .then((result) => {
      res.clearCookie("userId");
      res.clearCookie("sessionId");
      return res.status(200).send("Logged out");
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send("An error occurred during logout");
    });
}