import User from '../models/UserModel.js'
import jwt from 'jsonwebtoken';

const updateUserInfoRoute = async(req, res)=>{
    
    try {
        
        const {authorization} = req.headers;
        const {userId} = req.params;

        const {favouriteFood, hairColor, bio} = req.body;
        
        if(!authorization) res.status(401).json({message: "Authorization token not send"});
        
        const token = (authorization.split(" ")[1]);
        // const token = JSON.parse(authorization.split(" ")[1]);
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const {id, email} = decoded;

        if(id !== userId){
            res.status(401).json({message: "Unauthorized access"})
        }

        const user = await User.findOne({_id: id});

        if(user){
            const {startingInfo} = user;

            startingInfo.favouriteFood = favouriteFood || startingInfo.favouriteFood;
            startingInfo.hairColor = hairColor || startingInfo.hairColor;
            startingInfo.Bio = bio || startingInfo.Bio;
        }
        
        const updatedInfo = await user.save();

        const newToken = jwt.sign(
            {
              id,
              email,
              startingInfo: updatedInfo.startingInfo,
              isVerified: updatedInfo.isVerified,
            },
            process.env.JWT_SECRET,
            { expiresIn: "2d" }
          );
        res.status(200).json({newToken});

    } catch (error) {
        
        console.log(error.message);
        res.status(403).json({message: "Not allowed to update this user\'s data"})
    }
}

export default updateUserInfoRoute;