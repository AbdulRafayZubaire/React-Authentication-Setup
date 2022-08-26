import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationString:{
    type: String,
    default: "",
    unique: true
  },
  startingInfo: {
    hairColor: {
      type: String,
      default: "",
    },
    favouriteFood: {
      type: String,
      default: "",
    },
    Bio: {
      type: String,
      default: "",
    },
  },
});

const User = mongoose.model("User", userSchema);

export default User;
