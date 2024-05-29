const nodemailer = require("nodemailer");
//const { resolveHostName } = require("nodemailer/lib/shared");

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "40b4e72194ca67",
    pass: "d90fb3363d4958",
  },
});

//checking connection..
transporter.verify((error, sucess) => {
  if (error) {
    console.log("connection failed for email.", error);
  } else {
    console.log("mail server running....");
  }
});

module.exports = transporter;
