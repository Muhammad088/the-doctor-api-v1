const accountSid = "AC79e723633f9f8c98bf8086adb5b4bef0";
const authToken = "bf752ac5f8728f810469201137eba691";
const client = require("twilio")(accountSid, authToken);

exports.sendWhatsappMessage = () =>
  client.messages
    .create({
      body: `aaaaa`,
      //   body: `Your appointment is coming up on July 21 at 3PM`,
      from: `whatsapp:+14155238886`,
      to: `whatsapp:+201119722292`,
    })
    .then((message) => console.log(message.sid))
    .done();
