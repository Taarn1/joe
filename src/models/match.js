const { sqlHandler } = require("./sqlHandler.js");
const accountSid = 'AC1dc696c239bcb35f87e01c3c55187369';
const authToken = 'e717815b0c6c9fdad32175eb7268871a';
const client = require('twilio')(accountSid, authToken);

exports.matchFunction = async (userid) => {
  const selectUsersQuery = `
    SELECT DISTINCT o.userid, users.username, o.itemid, users.number
    FROM users 
    JOIN orders o ON users.userid = o.userid
    WHERE users.userid <> ${userid} 
    AND o.itemid IN (SELECT itemid FROM orders WHERE userid = ${userid})
    AND users.userid NOT IN (
      SELECT user1 FROM matches WHERE user2 = ${userid}
      UNION
      SELECT user2 FROM matches WHERE user1 = ${userid}
    )`;

  const match = await sqlHandler(selectUsersQuery);


  if (match.length > 0) {
    // Array to store recipient numbers
    const recipients = [];

    // Collect recipient numbers in the array
    for (const matchItem of match) {
      const recipient = "+45" + matchItem.number;
      recipients.push(recipient);
    }

    // Send a single Twilio message with all recipients
    try {
      const message = await client.messages.create({
        body: 'You got new matches!',
        from: '+15754493599',
        to: recipients.join(','), // Join multiple numbers with a comma
      });

      console.log('Message SID:', message.sid);
    } catch (error) {
      console.error("Error sending Twilio message:", error);
    }
  }

  return match;
};