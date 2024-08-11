import { asyncHandler } from "../util/asyncHandler.js";
import { ApiError } from "../util/ApiError.js";
import { ApiResponse } from "../util/ApiResponse.js";
import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";
import mongoose from "mongoose";
import { getReceiverSocketId } from "../socket/socket.js";
import { io } from "../socket/socket.js"; // test if it works without it


const sendMessage = asyncHandler(async (req, res, next) => {
    const { message } = req.body
    console.log('message', message)
    const { id: receiverId } = req.params // wao new syntax i didnt know
    const senderId = req.user._id

    if (!message) throw new ApiError(400, "Enter the message you want to send")

    // check if there is already a conversation between theses two ids
    let convo = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] }
    })
    if (!convo) {
        convo = await Conversation.create({
            participants: [senderId, receiverId]
        })
    }
    const newMessage = await Message.create({
        senderId,
        receiverId,
        message
    })
    if (!newMessage) throw new ApiError(500, "Something went wrong when getting your message")

    convo.messages.push(newMessage._id)
    await convo.save({ validateBeforeSave: false })

    const receiverSocketId = getReceiverSocketId(receiverId)
    if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage)
    }


    return res.status(200)
        .json(new ApiResponse(200, newMessage, "Message sent successfully"))
})

const getMessages = asyncHandler(async (req, res, next) => {
    const { id: userToChatWith } = req.params
    const senderId = req.user._id

    const messages = await Conversation.aggregate([
        {
            $match: {
                participants: {
                    $all: [new mongoose.Types.ObjectId(senderId), new mongoose.Types.ObjectId(userToChatWith)]
                }
            }
        },
        {
            $unwind: "$messages" // Unwind the messages array
        },
        {
            $lookup: {
                from: "messages", // Assuming the collection name is "messages"
                localField: "messages",
                foreignField: "_id",
                as: "messageDetails" // Output array containing details of each message
            }
        },
        {
            $unwind: "$messageDetails" // Unwind the array of message details
        },
        {
            $replaceRoot: { newRoot: "$messageDetails" } // Replace the root with the message details
        }
    ])

    if (!messages) throw new ApiError(500, "Something went wrong when fetching all messages")

    return res.status(200)
        .json(new ApiResponse(200, messages, "All messages successfully fetched"))
})

export { sendMessage, getMessages }




/* 
{
    LESSON
    await convo.save()
    await message.save()
    
    BetterWAY
    
    await Promise.all([convo.save(), message.save()])
    }
*/