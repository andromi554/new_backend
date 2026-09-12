import {ApiResponse} from "../utils/apiResponse.js"
import {ApiError} from "../utils/apiError.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {User} from "../models/user.models.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import { deleteFromCloudinary } from "../utils/cloudinary.js";
const registerUser = asyncHandler(async(req,res) =>{
    const {fullname,email,username,password} = req.body;
    if(
        [fullname,email,username,password].some((field) => {
            field?.trim() === ""
        })
    ){
        throw new ApiError(400,"full name is required")
    }

    const user = await User.findOne({
        $or:[{fullname},{username},{email}]
    })

    if(user){
        throw new ApiError(409,"User with this email or username already exists");

    }

    const avatar_local_path = req.files?.avatar?.[0]?.path;
    const coverImage_local_path = req.files?.coverImage?.[0]?.path;


    let avatar;

    try{
        avatar = await uploadOnCloudinary(avatar_local_path)
    }catch(error){
        console.log("error uploading avatars",error);
        throw new ApiError(500,"Failed to upload avatar");
    }

    const coverImage = await uploadOnCloudinary(coverImage_local_path);

   try {
     const newUser = await User.create({
         fullname,
         email,
         password,
         username,
         coverImage,
         avatar,
 
     })
 
     if(!newUser){
         throw new ApiError(500,"Something went wrong while creating a user")
     }
 
     const extraQuery = await User.findById(user._id).select("-password -refreshToken");
 
     return res.status(200).json(new ApiResponse(200,{extraQuery},"User has been regostered successfully"))
 
   } catch (error) {
    console.log("User cretion is failed")
    if(avatar){
        await deleteFromCloudinary(avatar.publicId);
    }
    if(coverImage){
        await deleteFromCloudinary(coverImage.publicId);
    }
    throw new ApiError(500,"Smoething went wrong whkile deleting a file")
   }
})