const { sqlHandler } = require("./sqlHandler.js");
const accountSid = 'ACdd77014abfe3b3acc834d1dd5fd0ca13';
const authToken = 'ce75014270262b5092d26410131b0724';
const client = require('twilio')(accountSid, authToken);

// Function to validate phone numbers
const isValidPhoneNumber = (number) => {
  const phoneNumberRegex = /^\+45\d{8}$/; // Replace with your desired phone number format
  return phoneNumberRegex.test(number);
};

exports.matchFunction = async (userid) => {
  // Assuming '60599375' is the hardcoded recipient number
  const recipientNumber = '+4523983993';

  // Send a Twilio message only if the recipient number is valid
  if (isValidPhoneNumber(recipientNumber)) {
    try {
      const message = await client.messages.create({
        body: 'You got a new match',
        messagingServiceSid: 'MGa425a7ff7f48100f00dae40b248eb1db',
        to: recipientNumber,
      });

      console.log(`Message SID for ${recipientNumber}:`, message.sid);
    } catch (error) {
      console.error("Error sending Twilio message:", error);
    }
  } else {
    console.warn(`Invalid phone number: ${recipientNumber}`);
  }

  return []; // Returning an empty array as there are no matches retrieved from the database
}