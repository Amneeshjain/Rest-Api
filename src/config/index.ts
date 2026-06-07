// node modules
import dotenv from 'dotenv'


// dotenv function call
dotenv.config();


//  constant
const CORS_WHITELIST = [
     'http://tech.codewithamneesh.com',
     'http://localhost:3000',
     'http://127.0.0.1:3000'
   ];
const _1H_IN_MILLISECONDS=1000*60*60;
const _7D_IN_MILLISECOND=1000*60*60*24*7;
const Config={
     PORT : process.env.PORT!,
     DATABASE_URL : process.env.MONGO_DATABASE_STRING!,
     NODE_ENV:process.env.NODE_ENV!,
     JWTSECRECT: process.env.JWT_SECRET!,
     CORS_WHITELIST,
     WINDOW_MS:_1H_IN_MILLISECONDS,
     MONGO_CONNECTION_URI:process.env.MONGO_CONNECTION_URI!,
     WHITELISTED_EMAIL:process.env.WHITELIST_EMAIL?.split(','),
     JWT_ACCESS_SECRECT:process.env.JWT_ACCESS_SECRECT!,
     JWT_REFRESH_SECRECT:process.env.JWT_REFRESH_SECRECT!,
     COOKIE_MAX_AGE:_7D_IN_MILLISECOND,

};


 export const config=Object.freeze(Config);