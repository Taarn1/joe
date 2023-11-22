const sqlite3 = require("sqlite3").verbose();
const path = require ("path");
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
  if (!req.body.email || !req.body.password) {
    return res.status(400).send("Request lacks content");
  }
  const result = await db.run(
    `SELECT user_id, user_email, user_password, username FROM users 
    WHERE user_email = '${req.body.email}' AND user_password = '${req.body.password}'`
  );
  if (Object.keys(result).length) {
    return res.status(201).send(result);
  } else {
    return res.status(400).send("User not found");
  }
}; 
*/
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

// tilføj favorit kategorier
exports.favoriteCategories = async (req, res) => {
  // Checker om der er sendt et id
  if (!req.body.id) {
    return res.status(400).send("Request lacks content");
  }
  const id = req.body.id;
  let sql = "DELETE FROM user_categories WHERE user_id =" + id + "; ";
  sql +=
    "INSERT INTO user_categories (user_categories_id, cat_id, user_id) VALUES ";
  // Checker om der er sendt kategorier
  if (!Object.keys(req.body.data).length) {
    sql += `(NEXT VALUE FOR dbo.seqFavArticleIDs, 1, ${id})`;
  } else {
    for (const key in req.body.data) {
      if (Object.hasOwnProperty.call(req.body.data, key)) {
        const e = req.body.data[key];
        sql += `(NEXT VALUE FOR dbo.seqUserCategories, (SELECT cat_id FROM categories WHERE category = '${e}'), ${id}),`;
      }
    }
    // Fjerner et komma til sidst
    sql = sql.substring(0, sql.length - 1);
  }

  try {
    executeSQL(sql);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

// læste artikler
exports.readArticles = async (req, res) => {
  const result = await executeSQL(
    `INSERT INTO read_articles (read_articles_id, user_id, article_id)
    SELECT NEXT VALUE FOR dbo.seqReadArticleIDs, '${req.body.id}', (SELECT article_id FROM news WHERE title = '${req.body.article}')
    WHERE NOT EXISTS (SELECT 1 FROM read_articles WHERE article_id = (SELECT article_id FROM news WHERE title = '${req.body.article}') AND user_id = ${req.body.id});`
  );
  res.status(200);
};

// indsætter favorite artikler til databasen
exports.favoriteArticles = async (req, res) => {
  const result =
    await executeSQL(`INSERT INTO fav_articles (fav_articles_id, article_id, user_id)
  SELECT NEXT VALUE FOR dbo.seqFavArticleIDs, ${req.body.article_id}, ${req.body.id}
  WHERE NOT EXISTS (SELECT 1 FROM fav_articles WHERE article_id = ${req.body.article_id} AND user_id = ${req.body.id})`);
  return res.json(result);
};

// henter favorite artikler til klienten
exports.getFavoriteArticles = async (req, res) => {
  const result = await executeSQL(`
  SELECT * FROM fav_articles
  JOIN news n ON n.article_id = fav_articles.article_id 
  WHERE user_id = '${req.query.id}'`);
  return res.json(result);
};
*/