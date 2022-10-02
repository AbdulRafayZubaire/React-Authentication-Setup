import jwt from 'jsonwebtoken';
import getGoogleUser from '../utils/getGoogleUser.js'
import updateOrCreateUserFromGoogleOauth from '../utils/updateOrCreateUserFromGoogleOauth.js';


const googlOauthCallbackRoute = async (req, res) => {

    const { code } = req.query;
    console.log('code', code);
    
    const oauthUserInfo = await getGoogleUser({ code });
    console.log('userinfo', oauthUserInfo);
    
    const updatedUser = await updateOrCreateUserFromGoogleOauth({ oauthUserInfo });
    console.log('udated user', updatedUser);

    const { _id: id, isVerified, email, info } = updatedUser;
    
    try {

        const token = await jwt.sign({
            id, isVerified, email, info
        }, process.env.JWT_SECRET, { expiresIn: '2d' });
        
        console.log('hello');
        res.redirect(`http://localhost:3000/login?token=${token}`)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: error.message })
    }
}

export default googlOauthCallbackRoute;