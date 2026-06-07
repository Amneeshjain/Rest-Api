

// Node Modules
import { Router } from "express";





// routes
 import authRoute from '@/routes/auth'

//  intial express Router 
const router=Router();

router.get("/",(req,res)=>{
    res.status(200).json({
        message:"API is live",
        status:"ok",
        version:"1.0.0",
        docs:'https://docs.shortly.codewithAmneesh.com',
        timeStamp:new Date().toISOString(),
    })
 })

// auth Route

router.use("/auth",authRoute)


export default router;



