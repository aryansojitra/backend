import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(  async(req,res)=>{
    // GET USER DATAILS FROM FRONT END
    // validation - not empty
    // check if user already exist : username,email
    // check for images,check for avatar
    // upload the cloudinary,avatar
    // create user object - create entry in DB
    //remove password and refresh token field from response
    //check for user creation
    //return res

    const {fullName,email,username,password}=req.body;
    console.log(email);

    if(
        [fullName,email,username,password].some((field)=> field?.trim()==="" )

){
        throw new ApiError(404,"fullname is required")
    }

   const existedUser = User.findOne({
        $or:[{ username },{ email },]
    })

    if(existedUser){
        throw new ApiError(409,"User with email or username already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalpath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400,"avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)

     const coverImage = await uploadOnCloudinary(coverImageLocalpath)

     if(!avatar){
        throw new ApiError(400,"avatar file is required")
     }

     const user = await User.create({
        fullName,
        avatar : avatar.url,
        coverImage : coverImage?.url || "",
        email,
        password,
        username : username.toLowerCase()
     })

     const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
     )

     if(!createdUser){
        throw new ApiError(500,"something went wrong while registering user")
     }

     return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered successfully")
     )

})

export {registerUser}