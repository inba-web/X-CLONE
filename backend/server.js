import express from "express"
import dotenv from "dotenv"
import authRoute from "./routes/auth.route.js";
import connectDB from "./db/connectDb.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js"; 


dotenv.config();
const app = express();
const PORT = process.env.PORT;  

app.use(express.json()) 
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());


app.use("/api/auth", authRoute) 
app.use("/api/users", userRoute)


app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`)
    connectDB();
})
