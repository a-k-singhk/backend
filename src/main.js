import mongoose from "mongoose";
//import 'dotenv/config';
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
    path:'./env'
})

connectDB();

/* This code is also a approach to conncet the backend with the database
import express from 'express';
import { configDotenv } from "dotenv";
const app=express();
;(async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        app.on("error",(error)=>{
            console.log("Error",error);
        });
        app.listen(process.env.PORT,()=>{
            console.log(`App is listening on ${process.env.PORT}`);
        })
    } catch (error) {
        console.error("Error:",error);
        throw error
    }
})()*/
