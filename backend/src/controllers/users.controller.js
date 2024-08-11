import { asyncHandler } from "../util/asyncHandler.js";
import { ApiError } from "../util/ApiError.js";
import { ApiResponse } from "../util/ApiResponse.js";
import { User } from "../models/user.model.js";


const getUsersForSideBar = asyncHandler(async(req, res, next) => {
    const loggedUserID = req.user._id

    const filteredUsers = await User.find({
        _id: {
            $ne: loggedUserID // not equal to
        }
    }).select("-password")

    return res.status(200)
        .json(new ApiResponse(200, filteredUsers, "All users fetched"))
})


export { getUsersForSideBar }