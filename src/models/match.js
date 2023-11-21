const {sqlHandler} = require("./sqlHandler.js")

async function matchFunction(sql) {
    let users = await sqlHandler(sql)
        console.log(users)
}
matchFunction("SELECT * FROM users;")