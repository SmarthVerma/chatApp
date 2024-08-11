import jwt  from "jsonwebtoken";
import { asyncHandler } from "../util/asyncHandler.js";
import { ApiError } from "../util/ApiError.js";
import { User } from "../models/user.model.js";

const verifyJWT = asyncHandler(async(req, res, next) => {
    const incomingToken = req.cookies?.accessToken
    if(!incomingToken) throw new ApiError(400, "Unauthorized")

    const decodedToken = jwt.verify(incomingToken, process.env.ACCESS_SECRET_KEY)
    if (!decodedToken) throw new ApiError(400, "Invalid Access token")
    
    const userId = decodedToken._id
    const user = await User.findById(userId)
    if(!user) throw new ApiError(400, "User cannot be found by this access token")

    req.user = user
    next()
})

export {verifyJWT}
