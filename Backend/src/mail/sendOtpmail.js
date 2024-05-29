const path = require("path");
const ejs = require("ejs");
const transporter = require("../mail/transporter");

const sendOtpMail = async ({ email, Otp }) => {
  const TemplatePath = path.join(__dirname, "../template/email.ejs");
  const data = await ejs.renderFile(TemplatePath, { email, Otp });

  const mainOptions = {
    from: '"Vinayak hiwse" vinayak.empiric@gmail.com',
    to: email,
    subject: "Account created",
    html: data,
  };

  await transporter.sendMail(mainOptions);
};

module.exports = sendOtpMail;
