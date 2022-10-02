import User from '../models/UserModel.js'


const updateOrCreateUserFromGoogleOauth = async ({oauthUserInfo}) =>{

    const {
        id: googleId,
        verifiedEmail: isVerified,
        email,
    } = oauthUserInfo;

    const userExist = await User.findOne({email});

    if(userExist){
        
        const updatedUser = await User.findOneAndUpdate({email}, {isVerified});

        console.log(updatedUser);
        return updatedUser;
    }
    else{

        try {
            
            const user = {
                email, googleId, isVerified
            };
            
            const savedUser = await User.create(user);
            return savedUser;
        } catch (error) {
            console.log('model error', error.message);
        }
    }
}

export default updateOrCreateUserFromGoogleOauth;
