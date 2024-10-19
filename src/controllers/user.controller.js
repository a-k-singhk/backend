import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from '.././utils/ApiError.js';
import {User} from '../models/user.model.js';
import {uploadonCloudinary} from '../utils/cloudinary.js';
import {ApiResponse} from '../utils/ApiResponse.js';

const generateAccessandRefreshToken=async(userId)=>{
    try {
        const user= await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        const accessToken=user.generateAccessToken();
        const refreshToken=user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave:false})
        return {accessToken,refreshToken}
    } catch (error) {
        throw new ApiError(500,"Something went wrong while generationg refresh and access token");
    }
}

const registerUser=asyncHandler(async(req,res)=>{

    // Steps for registering users
    //1.Get user's details from frontend
    //2.Validation -not empty or in correct format
    //3.check if user already exist: username,email
    //4.Check for images, check for avatar
    //5.Upload them to cloudinary,avatar
    //6.create user object- create entry in db
    //7. remove the password and refresh token field from response
    //8.check for user creation
    //9.return the response

    const {fullName,email,username,password}=req.body
    if(
        [fullName,email,username,password].some((field)=>
        field?.trim()=="")
    ){
        throw new ApiError(400,"All fields are required");
    }
    const existedUser=await User.findOne({
        $or:[{username},{email}]
    })
    if(existedUser){
        throw new ApiError(409,"User with username or email is already exist");
    }
    const avatarLocalPath=req.files?.avatar[0]?.path;
    //const coverLocalPath=req.files?.coverImage[0]?.path;
    let coverLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length>0){
        coverLocalPath=req.files.coverImage[0].path
    }

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required");
    }
    const avatar=await uploadonCloudinary(avatarLocalPath);
    const coverImage=await uploadonCloudinary(coverLocalPath);

    

    if(!avatar){
        throw new ApiError(404,"Avatar field is required");
    }

    const user= await User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()
    })
    const createdUser=await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering user")
    }

    return res.status(200).json(
        new ApiResponse(201,createdUser,"User created successfully")
    );
})

const loginUser=asyncHandler(async(req,res)=>{
    // req-body data
    //username or email
    //find the user
    //password check
    //access and refresh token
    //send cookie

    const {email,username,password}=req.body;
    if(!(username || email)){
        throw new ApiError(400,"username or email is required");
    }
    const user=await User.findOne({
        $or:[{email},{username}]
    })
    if(!user){
        throw new ApiError(404,"User does not exist");
    }
    const isPasswordValid=await user.isPasswordCorrect(password);
    if(!isPasswordValid){
        throw new ApiError(401,"Invalid user credentials");
    }
    const {accessToken,refreshToken} =await generateAccessandRefreshToken(user._id);
    const loggedInUser=await User.findById(user._id).select("-password -refreshToken");
    const options={
        httpOnly:true,
        secure:true,
    }
    return res.status(200).cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options).json(
        new ApiResponse(
            200,
            {
                user:loggedInUser,accessToken,
                refreshToken
            },
            "User looged In successfully"
        )
    )

})

const logoutUser=asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshToken:null
            }
        },
        {
            new:true
        }
    )
    const options={
        httpOnly:true,
        secure:true,
    }

    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,{},"User logged out successfully"))
})

export {registerUser,loginUser,logoutUser}