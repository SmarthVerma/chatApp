import express from 'express'
import cors from 'cors'
import cookieParser  from "cookie-parser";
import { app } from './socket/socket.js';


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: "16kb" }))        // to parse incoming json payloads from req.body
app.use(express.urlencoded({ extended: true, limit: "16kb" })) // to parse form data, form data is differnt from json data
app.use(express.static("public"))
app.use(cookieParser()) 

 
//routes import

import authRouter from './routes/auth.routes.js'
import messageRouter from './routes/message.routes.js'
import usersRouter from './routes/user.routes.js'


//routes declaration

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/messages', messageRouter)
app.use('/api/v1/users', usersRouter)   


export { app }  