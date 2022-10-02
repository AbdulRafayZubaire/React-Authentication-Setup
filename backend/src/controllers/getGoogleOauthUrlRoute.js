import getGoogleOauthUrl from "../utils/getGoogleOauthUrl.js";

const getGoogleOauthUrlRoute = (req, res) =>{

    const url = getGoogleOauthUrl();

    res.status(200).json({url});
}

export default getGoogleOauthUrlRoute;