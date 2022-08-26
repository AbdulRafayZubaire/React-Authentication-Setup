import { v4 as uuid } from 'uuid';
import User from '../models/UserModel.js';
import sendResetPassEmail from '../sendResetPassEmail.js';

const forgotPasswordRoute = async (req, res) => {

    const { email } = req.params;

    const passwordResetString = uuid();

    try {
        
        const user = await User.findOne({ email });
    
        if (user) {
            user.passwordResetString = passwordResetString;
            user.save();
            // console.log('user', user);
    
            sendResetPassEmail(email, passwordResetString);
        }
    } catch (error) {
        
        console.log(error);
        res.status(500).json(error.message)
    }

    // console.log('here');
    res.status(200).json({msg: "successfull"});
}

export default forgotPasswordRoute