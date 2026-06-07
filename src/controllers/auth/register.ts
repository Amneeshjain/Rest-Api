


import type { Request,Response } from "express";
import bcrypt from "bcrypt"
import {config} from "@/config"
import User, { IUser } from "@/models/user";
import { generateMongooseId } from "@/utils";
import { generateAccessToken,generateRefreshToken } from "@/lib/jwt";

type RequestBody = Pick<IUser,'name'|'email'|'password'|'role'> ;
const register = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password, role } = req.body as RequestBody;
  
    const normalizedEmail = email.toLowerCase().trim();

    if (
      role === 'admin' &&
      !config.WHITELISTED_EMAIL?.map(e => e.toLowerCase().trim()).includes(normalizedEmail)
    ) {
       res.status(400).json({
        code: 'BadRequest',
        message: 'You are not allowed to create an admin account'
      });
      return;
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
  
 try {

    //  generate userId
    const userId=generateMongooseId();

    const refreshToken=generateRefreshToken({userId});
    const accessToken=generateAccessToken({userId});

    const user= await User.create({
      _id:userId,
      name:name,
      email:email,
      password:hashedPassword,
      role,
      refreshToken


    });
  res.cookie('refreshtoken',refreshToken,{
    maxAge:config.COOKIE_MAX_AGE,
    httpOnly:config.NODE_ENV==="production",
    secure:true,
  });

res.status(200).json({

 user:{
  _id:user._id,
  name:user.name,
  email:user.email,
  passwordResetToken:user.passwordResetTokken,
  role:user.role,
 },
 accessToken

})

 } catch (error) {
  console.log('error during the register a user ',error)
  res.status(500).json({
    code:'ServerError',
    message:'Internal server Error',
    
  });
 }
  
  
  };


export default register; 