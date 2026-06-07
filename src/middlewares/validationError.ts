

import { validationResult } from "express-validator";

import { Request,Response,NextFunction } from "express";




const validationError=(req:Request,res:Response,next:NextFunction):void=>{

const errors= validationResult(req)
if(!errors.isEmpty()){
    res.status(400).json({
      code:'validationError',
      erorr:errors.mapped()

    })
    return;
}
 next();
}

export default validationError;