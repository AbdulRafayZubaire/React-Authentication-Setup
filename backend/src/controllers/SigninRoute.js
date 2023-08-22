import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import User from '../models/UserModel.js'

const SiginRoute = async(req, res) =>{
  console.log("login");

    try {
        
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if(!user){
        return res.status(404).json({msg: "Invalid email or Password"})
    }
    
    const {_id: id, isVerified, password: passwordHash, startingInfo} = user;


    const isCorrect = await bcrypt.compare(password, passwordHash);

    if(isCorrect){

        const token = jwt.sign(
            {
              id,
              email,
              startingInfo,
              isVerified,
            },
            process.env.JWT_SECRET,
            { expiresIn: "2d" }
          );

        res.status(200).json({token})
    }
} catch (error) {
        res.status(500).json({msg: error.message})
}
}

export default SiginRoute