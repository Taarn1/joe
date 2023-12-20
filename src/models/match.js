const { sqlHandler } = require("./sqlHandler.js");
// Twilio setup. Insert your own keys here.
const accountSid = '';
const authToken = '';
const messagingServiceSid = '';

const client = require('twilio')(accountSid, authToken);

// Function to validate phone numbers
const isValidPhoneNumber = (number) => {
  const phoneNumberRegex = /^\+45\d{8}$/;
  return phoneNumberRegex.test(number);
};
//
exports.matchFunction = async (userid) => {
  //matching algorithm
  // matches with the first user that has the same itemid as the current user
  const selectUsersQuery = `
    SELECT u.userid, u.username, u.email, u.number, o.itemid
    FROM users u
    JOIN orders o ON u.userid = o.userid
    WHERE u.userid <> ${userid} AND
    o.itemid IN (
      SELECT o.itemid
      FROM orders o
      WHERE o.userid = ${userid}
    )`;
  // Find matches in the database
  const match = await sqlHandler(selectUsersQuery);
  if (match.length > 0) {
    // Array to store valid recipient numbers
    const validRecipients = [];

    // Collect valid recipient numbers in the array
    for (const matchItem of match) {
      const recipient = "+45" + matchItem.number;

      if (isValidPhoneNumber(recipient)) {
        validRecipients.push(recipient);
      } else {
        console.warn(`Invalid phone number: ${recipient}`);
      }
    }
    // Send individual Twilio messages to each valid recipient
    try {
      for (const validRecipient of validRecipients) {
        const message = await client.messages.create({
          body: 'You got a new match',
          messagingServiceSid: messagingServiceSid,
          to: validRecipient, // Use the current validRecipient in the loop
        });

        console.log(`Message SID for ${validRecipient}:`, message.sid);
      }
    } catch (error) {
      console.error("Error sending Twilio messages:", error);
    }
  } else {
    console.warn('No matches found.');
  }
  // Return the match array for use in the controller
  return match;
};