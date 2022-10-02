import oAuthClient from "./oAuthClient.js";

const getGoogleOauthUrl = () =>{

    const scope = [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
      ];
      
      return oAuthClient.generateAuthUrl({
          // 'online' (default) or 'offline' (gets refresh_token)
          access_type: 'offline',
          prompt: 'consent',
          /** Pass in the scopes array defined above.
            * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
          scope: scope,
          // Enable incremental authorization. Recommended as a best practice.
          include_granted_scopes: true
        });
}

export default getGoogleOauthUrl;


