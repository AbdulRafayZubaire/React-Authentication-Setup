import axios from 'axios';
import oAuthClient from './oAuthClient.js';

const getAccessAndBearerTokenUrl = (accessToken)=>{

    return `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`
};

const getGoogleUser = async({code})=>{

    const {tokens} = await oAuthClient.getToken(code);

    console.log('tokens-google', tokens);
    const response = await axios.get(
        getAccessAndBearerTokenUrl(tokens.access_token), {
            headers: {Authorizaion: `Bearer ${tokens.id_token}`}
        }
    );
    
    console.log('response-data', response.data);
    return response.data;
};

export default getGoogleUser;