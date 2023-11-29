const sqlite3 = require('sqlite3').verbose();
const path = require('path');
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
//  sqlHandler(`delete from matches where match_id >0`)

  
module.exports = {sqlHandler}