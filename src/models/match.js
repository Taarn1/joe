const {sqlHandler} = require("./sqlHandler.js")

async function matchFunction() {
    let users = await sqlHandler("SELECT * FROM sqlite_master;")
        console.log(users)
}
matchFunction()