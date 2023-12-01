const { text } = require("stream/consumers");
const {sqlHandler} = require("./sqlHandler.js")
const accountSid = 'AC1dc696c239bcb35f87e01c3c55187369';
const authToken = 'aeaf90b929349d42e1d3d14fea04275b';
const client = require('twilio')(accountSid, authToken);
exports.matchFunction = async (userid)=> {
    const selectUsersQuery = `
    SELECT DISTINCT o.userid, users.username, o.itemid, users.number
    FROM users 
    JOIN orders o ON users.userid = o.userid
    where users.userid <> ${userid} AND o.itemid in (select itemid from orders where userid = ${userid})`
    const match = await sqlHandler(selectUsersQuery)
    if (match.leghth > 0) {
        match.forEach(match => {
            const recipient = match.number
            client.messages
            .create({
                body: 'You got a new match!',
                from: '+15754493599',
                to: recipient
            })
            .then(message => console.log(message.sid))
            .done();
        }) 
    }
    return match 
}