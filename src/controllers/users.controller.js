const sqlite3 = require("sqlite3").verbose();
const path = require ("path");
const crypto = require("crypto");
//write a function, usershandler that returns the result of "SELECT * FROM users"
const sqlHandler = (sql, params) => {
  return new Promise((resolve, reject) => {
    let db = new sqlite3.Database(path.resolve(__dirname, '../../joeDatabase.sqlite'), (err) => {
      if (err) {
        console.error(err.message);
        reject(err);
      } else {
        console.log('Connected to the database.');
        db.serialize(() => {
          db.all(sql, params, (err, rows) => {
            if (err) {
              reject(err);
            } else {
              resolve(rows);
            }
          });
        });
        db.close((err) => {
          if (err) {
            console.error(err.message);
            reject(err);
          } else {
            console.log('Close the database connection.');
          }
        });
      }
    });
  });
};
/*
exports.login = async (req, res) => {
  if (!req.body.username|| !req.body.password) {
    return res.status(400).send("Request lacks content");
  }
  const result = await sqlHandler(
    `SELECT userid, email, password, username FROM users 
    WHERE username = ? AND password = ?`,
    [req.body.username, req.body.password]
  );
  if (Object.keys(result).length) {
    console.log(req.body.username + " logged in");
    return res.status(201).send(result);
  } else {
    console.log(req.body.username + "User not found")
    return res.status(400).send("User not found")
  }
};*/
// opret bruger
exports.signUp = async (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.username) {
    return res.status(400).send("Request lacks content");
  }
 //check om mail er i brug
  let check = await sqlHandler(`SELECT userid, username, email, password FROM users WHERE email = ?`,
        [req.body.email]);
  // hvis check er længere end 0, findes e-mailen allerede
  if (Object.keys(check).length) {
    return res.status(400).send("E-mail already in use");
  }
  try {
    // opretter en ny bruger i databasen 
      await sqlHandler(
        `INSERT INTO users (username, email, password, age, number, cityid, picid)
         VALUES (?, ?, ?, ?, ?, (SELECT cityid FROM city WHERE cityname = ?),
                 (SELECT seq + 1 FROM sqlite_sequence WHERE name = 'pictures'))`,
        [req.body.username, req.body.email, req.body.password, req.body.age, req.body.number, req.body.preferredCity]
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
/* 
// find bruger
exports.getUser = async (req, res) => {
  const result = await executeSQL(
    `SELECT user_id, user_email, user_password, username FROM users 
    WHERE user_id = '${req.params.id}'`
  );
  res.send(result);
};

// opdater bruger
exports.updateUser = async (req, res) => {
  if (!req.params.id || !req.body.password || !req.body.username) {
    return res.status(400).send("Request lacks content");
  }
  await executeSQL(
    `UPDATE users
    SET user_password = '${req.body.password}', username = '${req.body.username}'
    WHERE user_id = ${req.params.id}`
  );
  res.status(200).send(req.body);
};

// slet bruger
exports.deleteUser = async (req, res) => {
  if (!req.params.id) return res.status(400).send("Request lacks ID");
  const query = await executeSQL(
    `DELETE users WHERE user_id = ${req.params.id}`
  );
  res.status(200).send("User deleted");
};
*/