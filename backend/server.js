import express from "express"
import dotenv from "dotenv"
import authRoute from "./routes/auth.route.js";
import connectDB from "./db/connectDb.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js"; 
import cloudinary from "cloudinary"    
import postRoute from "./routes/post.route.js";
import notificationRoute from "./routes/notification.route.js";
import cors from "cors";

const app = express();

dotenv.config();

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
});

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
const PORT = process.env.PORT;  

app.use(express.json({
    limit : "10mb"
})) 
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());


app.use("/api/auth", authRoute) 
app.use("/api/users", userRoute)
app.use("/api/posts", postRoute)
app.use("/api/notifications", notificationRoute)


app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`)
    connectDB();
})
