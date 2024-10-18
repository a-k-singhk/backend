import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';


const app=express();
//Configure the cors
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
//Middleware to cofigure request
app.use(express.json({limit:"16kb"}));

//Configure if the data is coming from the URL
//Extended is used to give more level of nested object means object inside object
app.use(express.urlencoded({extended:true,limit:"16kb"}));

//Middleware to store static files
app.use(express.static("public"))

//Store the secure cookies in users browser
app.use(cookieParser());




export {app}