import User from '../models/UserModel.js'
import bcrypt from 'bcrypt'

const resetPasswordRoute = async(req, res)=>{

    //Route: api/:passwordResetString/reset-password
    const { passwordResetString} = req.params;
    const { newPassword} = req.body;

    try {
        
        console.log('here');
        const newPasswordHash = await bcrypt.hash(newPassword, 10);
    
        const user = await User.findOne({passwordResetString})
    
        if(user){
            user.password = newPasswordHash;
            user.passwordResetString = null;
            user.save();

            res.status(200).json({msg: "successfull"});
        }
        else{
            res.status(404).json({msg: "Incorrect passsword reset verification string"})
        }
    } catch (error) {
        
        console.log(error.message);
        res.status(500).json({msg: error.message})
    }
}

export default resetPasswordRoute