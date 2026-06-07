


import  jwt  from "jsonwebtoken";
import { config } from "@/config";


import { Types } from "mongoose";
import { JwtPayload } from "jsonwebtoken";


export type TokenPayLoad={userId:Types.ObjectId};
export type ResetLinkPayLoad={email:string};



const generateAccessToken=(payload:TokenPayLoad)=>{
const token =jwt.sign(payload,config.JWT_ACCESS_SECRECT,{
    expiresIn:'30m'
})

return token;
}

const generateRefreshToken=(payload:TokenPayLoad)=>{
    const token =jwt.sign(payload,config.JWT_REFRESH_SECRECT,{
        expiresIn:'7d'
    })
    
    return token;
    }


 const varifyAccessToken=(accessToken:string):string | JwtPayload=>{
       return jwt.verify(accessToken,config.JWT_ACCESS_SECRECT)
        }
        
const varifyRefreshToken=(refreshToken:string):string | JwtPayload=>{
            return jwt.verify(refreshToken,config.JWT_REFRESH_SECRECT)
             }
export { 
    generateAccessToken,
    generateRefreshToken,
    varifyAccessToken,
    varifyRefreshToken
}