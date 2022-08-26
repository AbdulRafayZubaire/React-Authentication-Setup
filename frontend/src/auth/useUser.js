import { useState, useEffect } from "react";
import useToken from './useToken';
import jwt from "jsonwebtoken";

const useUser = () =>{

    const [token] = useToken();

    const getPayloadFromToken = token =>{

        const encodedPayload = token.split('.')[1];
        return JSON.parse(atob(encodedPayload));
        // return jwt.verify(token, process.env.JWT_SECRET)
    }

    const [user, setUser] = useState(()=>{
        if(!token) return null;
        return getPayloadFromToken(token);
    })

    useEffect(()=>{

        if(!token){
            setUser(null)
        }
        else{
            setUser(getPayloadFromToken(token))
        }
    }, [token])

    return [user, setUser];
}

export default useUser