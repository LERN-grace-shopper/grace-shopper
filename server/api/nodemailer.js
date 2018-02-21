const nodeMailer = require("nodemailer");

const mailer = email => {
  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "crazyCrystals123@gmail.com",
      pass: "natalie123"
    }
  });

  const mailOptions = {
    from: '"Crystalz" <crazyCrystals123@gmail.com>',
    to: email,
    subject: "YOU GOT CRYSTALS",
    text:
      "hello, we here at crazy crystals would like to let you know, we recieved your order! please send us a check for and we'll send you your crystals ASAP!"
  };

  transporter.sendMail(mailOptions, error => {
    if (error) {
      return console.error(error);
    }
    console.log("IT WORKS SWEET BEBE JESUS");
  });
};

module.exports = mailer;
