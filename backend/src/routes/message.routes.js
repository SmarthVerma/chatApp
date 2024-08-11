import { Router } from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()

router.route("/:id").get(verifyJWT ,getMessages)
router.route("/send/:id").post(verifyJWT ,sendMessage)

export default router