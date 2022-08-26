import bcrypt from "bcrypt";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import {v4 as uuid} from 'uuid';
import sendEmail from "../sendEmail.js";

// ROUTE: /api/signup
const SignupRoute = async (req, res) => {
  const { email, password } = req.body;

  try {
    const prevuser = await User.findOne({ email });

    if (prevuser) {
      res.status(409).json({ msg: "user with this email already exist" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const verificationString = uuid();

    const user = {
      email,
      password: passwordHash,
      verificationString,
    };

    const savedUser = await User.create( user );

    if (savedUser) {

      //sending verification Email
      sendEmail(email, verificationString);

      const token = jwt.sign(
        {
          id: savedUser._id,
          email,
          startingInfo: savedUser.startingInfo,
          isVerified: savedUser.isVerified,
        },
        process.env.JWT_SECRET,
        { expiresIn: "2d" }
      );

      res.status(200).json({ token });
    }
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

export default SignupRoute;
