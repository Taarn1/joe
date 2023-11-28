const sqlite3 = require("sqlite3").verbose();
const path = require ("path");
const crypto = require("crypto");
const { v4: uuidv4 } = require('uuid');
//write a function, usershandler that returns the result of "SELECT * FROM users"

const {sqlHandler} = require("../models/sqlHandler.js");
const matchFunction = require("../models/match.js");
const hash = crypto.createHash('sha256');



exports.login = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send("Request lacks content");
  }
  const result = await sqlHandler(
    `SELECT userid, email, password, username FROM users 
    WHERE username = ? AND password = ?`,
    [req.body.username, hash.update(req.body.password, 'utf-8').digest('hex')]
  );
  if (result.length > 0) {
    const userId = result[0].userid;
    const cookieOptions = {
      httpOnly: false,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      sameSite: 'strict',
      path: '/',
    };
    const sessionId = uuidv4(); // Generate a unique session ID
    res.cookie('userId', userId, cookieOptions);
    res.cookie('sessionId', sessionId, cookieOptions);
    return res.status(201).send(result); 
  } else {
    console.log(req.body.username + " User not found")
    return res.status(400).send("User not found")
  }
};
// opret bruger
exports.signUp = async (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.username) {
    return res.status(400).send("Request lacks content");
  }
 //check om mail er i brug
  let check = await sqlHandler(`SELECT userid, username, email, password FROM users WHERE email = ? OR username = ?` ,
        [req.body.email, req.body.username]);
  // hvis check er længere end 0, findes e-mailen allerede
  if (Object.keys(check).length) {
    return res.status(400).send("E-mail or username already in use");
  }
  try {
    // opretter en ny bruger i databasen 
      await sqlHandler(
        `INSERT INTO users (username, email, password, age, number, cityid, picid)
         VALUES (?, ?, ?, ?, ?, (SELECT cityid FROM city WHERE cityname = ?),
                 (SELECT seq + 1 FROM sqlite_sequence WHERE name = 'pictures'))`,
        [req.body.username, req.body.email, hash.update(req.body.password, 'utf-8').digest('hex'), req.body.age, req.body.number, req.body.preferredCity]
      );

    // returner den nye bruger
    return res.status(201).send(req.body);

    // kaster en fejl hvis noget uventet går galt
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send("An error occurred while trying to create the user");
  }
};

// match
exports.findMatch = async (req, res) => {
  //check for user id

  try {
    // finder matches
    const match = await matchFunction.matchFunction(req.params.userid);
    console.log(match)
    if(match.length === 0){
      return res.status(400).send("No matches found. You can increase your chances by buying more products");
    }
    const check1 = await sqlHandler(`SELECT * FROM matches WHERE user1_id = ? AND user2_id = ?`, [Number(match[0].userid), Number(req.params.userid)]);
    const check2 = await sqlHandler(`SELECT * FROM matches WHERE user2_id = ? AND user1_id = ?`, [Number(match[0].userid), Number(req.params.userid)]);
    if(check1.length > 0 || check2.length > 0){
      return res.status(400).send("You have already matched with all compatible users");
    } else
    await sqlHandler(`INSERT INTO matches (user1_id, user2_id) VALUES (?, ?);
    `, [Number(match[0].userid), Number(req.params.userid)]);

    
    // returner matches
    return res.status(201).send(match);
  } catch (error) {
    console.error(error);
    return res.status(500).send("An error occurred while trying to match");
  }
};
exports.getMatches = async (req, res) => {
  //check for user id
  try {
    // finder matches
    const match = await sqlHandler(`
    SELECT u1.username AS username_1, u2.username AS username_2, user1_id, user2_id
    FROM matches m
    INNER JOIN users u1 ON m.user1_id = u1.userid
    INNER JOIN users u2 ON m.user2_id = u2.userid
    WHERE u1.userid = ? OR u2.userid = ?;
    `, [req.params.userid,req.params.userid]);
    // returner matches
    if (match.length === 0) {
      return res.status(400).send("No matches found");
    } else {
      return res.status(201).send(match);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("An error occurred while trying to get matches");
  }
};