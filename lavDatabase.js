 /*
const sqlite = require("sqlite3").verbose();
let sql 

const db = new sqlite.Database('./joeDatabase.sqlite', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the lav database.');
}); 
// Alt det følgende er bare for at lave tabellerne i databasen.
sql = `
    CREATE TABLE IF NOT EXISTS pictures (
        picid INTEGER PRIMARY KEY AUTOINCREMENT,
        picurl TEXT NOT NULL
    );
`; 

sql = `
    CREATE TABLE IF NOT EXISTS users (
    userid INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    age INTEGER NOT NULL,
    number INTEGER NOT NULL, 
    cityid INTEGER,
    picid INTEGER,
    FOREIGN KEY (cityid) REFERENCES city(cityid),
    FOREIGN KEY (picid) REFERENCES pictures(picid)
);
`; 
sql = `
    CREATE TABLE IF NOT EXISTS menu (
    itemid INTEGER PRIMARY KEY AUTOINCREMENT,
    itemname TEXT NOT NULL
    );
`; 

sql = `
    CREATE TABLE IF NOT EXISTS orders (
        orderid INTEGER PRIMARY KEY AUTOINCREMENT,
        userid INTEGER,
        itemid INTEGER,
        FOREIGN KEY (userid) REFERENCES users(userid),
        FOREIGN KEY (itemid) REFERENCES menu(itemid)
    );
`;  
db.run(sql);
*/

/*`
  CREATE TABLE matches (
    match_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user1_id INTEGER NOT NULL,
    user2_id INTEGET NOT NULL,
    CONSTRAINT different_users CHECK (user1_id <> user2_id),
    CONSTRAINT fk_user1 FOREIGN KEY (user1_id) REFERENCES users(user_id),
    CONSTRAINT fk_user2 FOREIGN KEY (user2_id) REFERENCES users(user_id)
);` */