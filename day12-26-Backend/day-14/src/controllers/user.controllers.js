import {asyncHandler} from "../utils/asyncHandles.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.models.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const generateAccessAndRefreshTokens = async (userId)=>{
    try{
        const user = await User.findById(userId)
         const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})

        return {accessToken, refreshToken}


    }catch(error){
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}

//steps to follow
//get user details from frontend
   //validation - not empty
   //check if user already exist : username , email
   //check for images, check for avatar
   //upload them to cloudinary, avatar
   //create user object - create entry in db
   //remove password and refresh token field from respinse 
   //check for user creation
   //return response

const registerUser = asyncHandler(async (req, res) => {
    console.log("STEP 1: Controller started");

    const { fullname, email, username, password } = req.body;

    console.log("email:", email);

    if ([fullname, email, username, password].some(
        (field) => !field || field.trim() === ""
    )) {
        throw new ApiError(400, "All fields are required");
    }

    // STEP 2: Check existing user
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    console.log("STEP 2: User lookup completed");

    if (existedUser) {
    console.log("Duplicate user detected");

    return res.status(409).json({
        success: false,
        message: "User with email or username already exists"
    });
}

    // Get uploaded image paths
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverImageLocalPath = req.files?.coverimage?.[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }
    

    // STEP 3: Upload avatar
    const avatar = await uploadOnCloudinary(avatarLocalPath);

    console.log("STEP 3: Avatar upload completed");

    // STEP 4: Upload cover image
    const coverImage = coverImageLocalPath
        ? await uploadOnCloudinary(coverImageLocalPath)
        : null;

    console.log("STEP 4: Cover image upload completed");

    if (!avatar) {
        throw new ApiError(400, "Avatar upload failed");
    }

    // STEP 5: Create user
    console.log("STEP 5: Creating user in MongoDB");

    const user = await User.create({
        fullname,
        email,
        username,
        password,
        avatar: avatar.url,
        coverimage: coverImage?.url || ""
    });

    console.log("STEP 6: User created", user._id);

    // STEP 7: Retrieve user
    const userCreated = await User.findById(user._id)
        .select("-password -refreshToken");

    console.log("STEP 7: User retrieved");

    // STEP 8: Send response
    console.log("STEP 8: Sending response");

    return res.status(201).json(
        new ApiResponse(201, userCreated, "User created successfully")
    );
});

//Steps for login user
// req body -> data
// username or email
//find the user I
//password check
//access and referesh token
//send cookie
const loginUser = asyncHandler(async(res, req)=>{

   const {email, username, password}= req.body

   if(!username || !email){
    throw new ApiError(400, "username or email is required")
   }

   const user = await User.findOne({
    $or:[{username}, {email}]  //here we wrote query for to find Username or email
   })

   if(!user){
    throw new ApiError(400, "user not found")
   }

  const isPasswordValid = await user.isPasswordCorrect(password)
   if(!isPasswordValid){
        throw new ApiError(401, "Invalid password" )
    }

 const {accessToken, refreshToken} =  await generateAccessAndRefreshTokens(user._id)
   
 const loggedInUser = User.findById(user._id).select("-password -refreshToken")

 const options = {
    httpOnly: true,
    secure: true
 }
 return res
 .status(200)
 .cookie("accessToken", accessToken, options)
 .cookie("refreshToken", refreshToken, options)
 .json(
    new ApiResponse(
        200, 
        {
            user: loggedInUser, accessToken, refreshToken
        },
        "User logged In succesfully"

    )

 )
})


const logoutUser = asyncHandler(async (res, req)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshToken: undefined
            }
        },
        {
            new: true
        }
     )

     const options = {
    httpOnly: true,
    secure: true
 }

 return res
 .status(200)
 .clearCookie("accessToken")
 .clearCookie("refreshToken")
 .json(new ApiResponse(200, {}, "user loggedOut successfully"))
})

export { registerUser, loginUser, logoutUser};

