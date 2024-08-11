import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { loginAuth, logoutAuth, signupAuth, userInfoAuth } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

const multerMiddleware = upload.fields([
    { name: "avatar", maxCount: 1 }
])

router.route("/signup").post(multerMiddleware, signupAuth)
router.route("/login").post(loginAuth)
router.route("/logout").get(verifyJWT, logoutAuth)
router.route("/info").get(verifyJWT, userInfoAuth)


export default router   