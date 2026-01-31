import mongoose from "mongoose";

import { DB_NAME } from "../constants.js"


const connectDB = async()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

        console.log("\n Mongodb connected! Successfully")

    }catch(error){
        console.log("Mongoose Connection error",error)
        process.exit(1)
    }
}

export default connectDB