
import dotenv from 'dotenv'
import connectDB from "./db/index.js";
import { app } from './app.js';
import { server } from './socket/socket.js';

dotenv.config({
    path: './env'
})

connectDB()
    .then(() => {
        server.listen(process.env.PORT || 8000, () => {
            console.log(`server is running at port : ${process.env.PORT}`)
        })
    }).catch((err) => {
        console.log(`MONGO FAILED CONNECTION!`, err)
        process.exit(1)
    })


















