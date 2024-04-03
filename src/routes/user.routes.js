import { Router} from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { User } from "../models/user.model.js";
import { loginUser, logoutUser, refreshAccessToken } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.route("/register").post(
    upload.fields([
        {
            name: "Avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ])
    ,registerUser)

    userRouter.route("/login").post( upload.fields([
        {
            name: "Avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]) ,loginUser)

//secured routes
userRouter.route("/logout").post(verifyJWT,  logoutUser)
userRouter.route("/refresh-token").post(refreshAccessToken)
export {userRouter}