import app from "./app.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({
    path: "./.env"
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        
        console.log(`server is running on port ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGODB connection failed  !!!", err);
})
//  const app = express();

//  ( async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
//         app.on("error", (error) => {
//             console.log("ERR", error);
//             throw error
//         })
//         app.listen(`App is running on port ${process.env.PORT}`)

//     } catch (error) {
//         console.log("Err: ", error);
//         throw error
//     }
//  })()
