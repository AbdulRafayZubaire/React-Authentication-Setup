import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js'

const emailVerificationRoute = async(req, res) =>{

    const {verificationString} = req.params;

    const user = await User.findOne({verificationString});

    if(user){
        user.isVerified = true;

        const updatedUser = user.save();

        const {_id: id, email, startingInfo} = user;

        const token = jwt.sign({id, email, startingInfo}, process.env.JWT_SECRET, {expiresIn: '2d'});


        res.status(200).json({token})
    }
    else{
        res.status(401).json({message: "The email verification token is incorrect"})
    }
}

export default emailVerificationRoute