import nodemailer from "nodemailer";

const sendEmail = (email, verificationString) => {

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
    subject: "email verification from React Auth", // Subject line
    html: `Click below to verify your email: http://localhost:3000/verify-email/${verificationString}`, // plain text body
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
};

export default sendEmail;
