const { sqlHandler } = require("./sqlHandler.js");
const accountSid = 'AC1dc696c239bcb35f87e01c3c55187369';
const authToken = 'e717815b0c6c9fdad32175eb7268871a';
const client = require('twilio')(accountSid, authToken);

exports.matchFunction = async (userid) => {
  const selectUsersQuery = `
    select u.userid, u.username, u.email, u.number, o.itemid
    from users u
    join orders o on u.userid = o.userid
    where u.userid <> ${userid} AND
    o.itemid in (SELECT o.itemid
    FROM orders o
    WHERE o.userid = ${userid})`;

  const match = await sqlHandler(selectUsersQuery)
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