import {asyncHandler} from "../utils/asyncHandles.js"

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
  
})


export {registerUser}