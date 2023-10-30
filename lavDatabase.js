const sqlite = require("sqlite3").verbose();
let sql 

const db = new sqlite.Database('./joeDatabase.sqlite', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the lav database.');
});

/* sql = `CREATE TABLE IF NOT EXISTS pictures ( 
    picid INTEGER PRIMARY KEY AUTOINCREMENT, 
    picurl TEXT NOT NULL
);`; 
db.run(sql);

sql= `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    picid INTEGER,
    FOREIGN KEY (picid) REFERENCES pictures(picid)
);`; 
db.run(sql); */