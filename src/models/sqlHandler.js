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

    //sqlHandler(`drop table matches`)
    /*sqlHandler(`
    create table if not exists matches (
        match_id integer primary key autoincrement,
        user1 integer,
        user2 integer,
        foreign key (user1) references users(user_id),
        foreign key (user2) references users(user_id)
    )`)*/
    //sqlHandler(`insert into matches (user1, user2) values (1, 2),(1, 3), (15,18)`)
    //sqlHandler("create table sessions (userid integer, sessionid text)")
module.exports = {sqlHandler}