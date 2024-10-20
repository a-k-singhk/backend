import mongoose,{isValidObjectId} from "mongoose";
import {Tweet} from '../models/tweet.model.js'
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const createTweet=asyncHandler(async(req,res)=>{

})

const getuserTweet=asyncHandler(async(req,res)=>{

})

const updateTweet=asyncHandler(async(req,res)=>{

})

const deleteTweet=asyncHandler(async(req,res)=>{

})

export {
    createTweet,
    getuserTweet,
    updateTweet,
    deleteTweet
}