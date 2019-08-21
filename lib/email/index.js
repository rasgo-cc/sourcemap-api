const config = require("../config");
const sendgrid = require("@sendgrid/mail");

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

exports = module.exports = {
  send(data) {
    sendgrid.send(data);
  }
};
