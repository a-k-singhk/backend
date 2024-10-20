import mongoose,{isValidObjectId} from "mongoose";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { User } from "../models/user.model.js";
import {Subscription} from '../models/subscriptions.model.js'
import { asyncHandler } from "../utils/asyncHandler.js";

const toogleSubscription=asyncHandler(async(req,res)=>{
    const {channelId}=req.params
})

const getuserChannelSubscribers=asyncHandler(async(req,res)=>{
    const {channelId}=req.params
})

const getSubscribedChannels=asyncHandler(async(req,res)=>{
    const {subscriberId}=req.params
})


export {
    toogleSubscription,
    getuserChannelSubscribers,
    getSubscribedChannels
}