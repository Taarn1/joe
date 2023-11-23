const {sqlHandler} = require("./sqlHandler.js")

const matchFunction = async ()=> {
    let users = await sqlHandler("SELECT * FROM sqlite_master;")
        console.log(users)
}
matchFunction()