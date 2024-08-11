import { asyncHandler } from "../util/asyncHandler.js";
import { ApiError } from "../util/ApiError.js";
import { ApiResponse } from "../util/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary as upload } from "../util/cloudinary.js";

//cookie options
const options = {
    httpOnly: true, // prevent xss attacks cross-site scripting attacks
    secure: process.env.NODE_ENV !== 'development',
    sameSite: "strict" // CSRF attacks cross-site request forgery attacks
}

const avatarOnGender = (gender, fullName) => {
    if (gender === "Male") return `https://avatar.iran.liara.run/public/boy?username=[${fullName}]`
    else if (gender === "Female") return `https://avatar.iran.liara.run/public/girl?username=[${fullName}]`
    else return "https://www.svgrepo.com/show/241591/clown-avatar.svg"
}

const generateAccessTokenAndRefreshTokens = async (id) => {
    try {
        const user = await User.findById(id)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken

        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }
    } catch (error) {
        console.log('error in genereating access and refresh tokens', error)
        throw new ApiError(404, "Something went wrong when generating access and refresh tokens")
    }

}

// controllres

const signupAuth = asyncHandler(async (req, res, next) => {
    const { fullName, email, password, confirmPassword, gender } = req.body

    if (!(password === confirmPassword)) throw new ApiError(400, "Confirm password does not match")

    const user = await User.findOne({ email }) // if user already exist

    if (user) throw new ApiError(400, "User already exists")

    let avatarLocalPath = false
    if (req.files?.avatar?.[0]?.path) avatarLocalPath = req.files.avatar[0].path;
    console.log(req.files)
    let avatar;
    if (avatarLocalPath) {
        avatar = await upload(avatarLocalPath)
        avatar = avatar.url
    } else {
        avatar = avatarOnGender(gender, fullName)
    }

    const newUser = await User.create({
        fullName,
        email,
        password,
        gender,
        avatar
    })



    return res.status(201, "User created")
        .json(new ApiResponse(201, newUser, "User succesfully created"))

})

const loginAuth = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body
    console.log(req.body)
    console.log('email',email,"type", typeof(email))
    console.log('password',password,"type", typeof(password))
    
    if (!(email && password)) throw new ApiError(400, "email and password is required")

    const userExist = await User.findOne({ email })
    if (!userExist) throw new ApiError(404, "User not found please register")

    const isPasswordCorrect = await userExist.isPasswordCorrect(password)
    if (!isPasswordCorrect) throw new ApiError(400, "Password invalid")

    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshTokens(userExist._id)

    const loggedUser = await User.findById(userExist._id).select("-password")

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, loggedUser, "Successfully logged in"))
})

const logoutAuth = asyncHandler(async (req, res, next) => {
    const userId = req.user._id

    await User.findByIdAndUpdate(
        userId,
        { $unset: { refreshToken: 1 } },
        { new: true }
    );

    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(200, null, "User logged out")
        )
})

const userInfoAuth = asyncHandler(async (req, res, next) => {
    
    return res.status(200)
        .json(new ApiResponse(200, req.user, "User info fetched succesfully"))
})


export { signupAuth, loginAuth, logoutAuth, userInfoAuth }