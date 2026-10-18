import {asyncHandler} from "../utils/asyncHandles.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.models.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async(req, res)=>{
   //get user details from frontend
   //validation - not empty
   //check if user already exist : username , email
   //check for images, check for avatar
   //upload them to cloudinary, avatar
   //create user object - create entry in db
   //remove password and refresh token field from respinse 
   //check for user creation
   //return response
   
  const {fullname, email, username, password} =req.body
  console.log("email:", email);
  // if(fullname === ""){
  //   throw new ApiError(400, "fullname is required")
  // }// this is begginer type for validation
  
  if (
    [fullname, email, username, password].some((field)=>
    field?.trim() === "")
  ) {
    throw new ApiError(400, "All field are required") // this is advance way to write with low code
  }

  const existedUser =User.findOne({
    $or: [{username}, {email}]
  })

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists")
    
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if(!avatarLocalPath){
    throw new ApiError(400, "Avatar file is required")
  }
  
  const avatar =await uploadOnCloudinary(avatarLocalPath)
  const coverImage = await uploadOnCloudinary(coverImageLocalPath)
  
  if(!avatar){
    throw new ApiError(400, "Avatar file is required")
  }
 
 const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || ''  })

    const userCreated = await User.findById(user._id).select("-password -refreshToken")

    if(!userCreated){
      throw new ApiError(500, "something went wrong while registering the user")
    }
    
    return res.status(201).json(
      new ApiResponse(200, userCreated, "user created successfully")
    )

})


export {registerUser}