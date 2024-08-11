import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
const app = express()
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["POST", "GET"]
    }
});

// function to get socket id depending upon what userId u sent
export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId]
}

const userSocketMap = {} // {userId: socketId}

io.on("connection", (socket) => {
    console.log('User is connected', socket.id)

    const userId = socket.handshake.query.userId //contains information about the initial handshake request when the client connects to the WebSocket server. It includes details like query parameters, headers, and other connection metadata.

    if (userId != undefined) userSocketMap[userId] = socket.id

    io.emit("getOnlineUsers", Object.keys(userSocketMap)) // updates getOnline users

    socket.on("disconnect", () => {
        console.log('User disconnected', socket.id)
        delete userSocketMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
});



export { app, server, io }