const {sqlHandler} = require("./sqlHandler.js")

exports.matchFunction = async (userid)=> {
    const selectUsersQuery = `
    SELECT DISTINCT o.userid, users.username, o.itemid 
    FROM users 
    JOIN orders o ON users.userid = o.userid
    where users.userid <> ${userid} AND o.itemid in (select itemid from orders where userid = ${userid})`
    const match = await sqlHandler(selectUsersQuery)
    console.log(match)
    return match
}