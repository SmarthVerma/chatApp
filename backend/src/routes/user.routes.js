import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getUsersForSideBar } from "../controllers/users.controller.js";

const router = Router()

router.route("/").get(verifyJWT ,getUsersForSideBar)


export default router