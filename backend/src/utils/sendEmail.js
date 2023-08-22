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
    html: `
    <h1>Verify your email</h1>
    <p>Click on the link below to verify your email</p>
    <a href="http://localhost:3000/verify-email/${verificationString}">Verify Email</a>
 
    <html>
    <head>
      <title>My Table</title>
      <style>
        table {
          border-collapse: collapse;
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
        }
        th,
        td {
          text-align: left;
          padding: 8px;
          border: 1px solid #ddd;
        }
        th {
          background-color: #f2f2f2;
        }
        img {
          max-width: 100%;
          height: auto;
        }
        .container {
          max-width: 800px;
          width: 90%;
          margin: 0 auto;
        }
        #total {
          width: 100%;
          text-align: right;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>BellHopt Order Received Successfully</h1>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Name</th>
              <th>Unit Price</th>
              <th>Qty</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody id="table-body"></tbody>
        </table>
        <div id="total">
          <h3>Total Price</h3>
          <h2></h2>
        </div>
  
        <div>
          <h3>Shipping Address</h3>
          <p>John Doe</p>
          <p>1234 Main St</p>
          <p>Anytown, USA 12345</p>
        </div>
  
        <div>
          <h3>Payment Method</h3>
          <p>Visa ending in 4242</p>
        </div>
  
        <div>
          <h3>Order Summary</h3>
          <p>Order #123456789</p>
          <p>Placed on 12/12/2020</p>
        </div>
  
        <div>
          <h3>Questions?</h3>
          <p>Have questions about your order? Contact us at</p>
        </div>
  
        <div>
          <h3>Thanks for shopping with us!</h3>
        </div>
      </div>
    </body>
  </html>
  
    Click below to verify your email: http://localhost:3000/verify-email/${verificationString}`, // plain text body
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
};

export default sendEmail;
