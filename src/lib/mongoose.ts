


import { config } from "@/config";
import mongoose, {  type ConnectOptions } from "mongoose";



const connectionOptions:ConnectOptions={
    serverApi:{
        version:'1',
        strict:true,
        deprecationErrors:true,


    },
    dbName:"restApi"
};



const connectdatabase=async():Promise<void>=>{

    if(!config.MONGO_CONNECTION_URI){
        throw new Error('Mongo URI is missing');
    }
try {

    await mongoose.connect(config.MONGO_CONNECTION_URI,connectionOptions)
    console.log('Database Connected Successfully');
} catch (error) {
   console.log('Failed to connect database',error) ;
}


}
const Disconnectdatabase=async():Promise<void>=>{

   
try {

    await mongoose.disconnect();
    console.log('Database disconnected Successfully');
} catch (error) {
   console.log('Error during disconnecting from  database',error) ;
}


}


export {connectdatabase,Disconnectdatabase};