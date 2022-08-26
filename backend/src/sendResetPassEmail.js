import nodemailer from "nodemailer";

const sendResetPassEmail = (email, verificationString) => {

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "abdurrafaykhawer20@gmail.com",
      pass: "iacjbptwqmebulim",
    },
  });
  const mailOptions = {
    from: "abdurrafaykhawer20@gmail.com", // sender address
    to: email, // list of receivers
    subject: "Password resetting Email", // Subject line
    html: `Click below to reset your password: http://localhost:3000/reset-password/${verificationString}`, // plain text body
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
};

export default sendResetPassEmail;
