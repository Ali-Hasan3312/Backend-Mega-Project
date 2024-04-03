import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({limit: "10mb"}))
app.use(express.urlencoded({extended: true, limit: "10mb"}))
app.use(express.static("public"))
app.use(cookieParser())
app.use(bodyParser.json({ limit: '10mb' }));

// Routes import
import { userRouter } from "./routes/user.routes.js";

//Routes declaration
app.use("/api/v1/users", userRouter)

// http://localhost:8000/api/v1/users/register

export default app;