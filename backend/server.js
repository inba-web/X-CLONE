import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary"; 
import connectDB from "./db/connectDb.js";  
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import notificationRoute from "./routes/notification.route.js"; 

dotenv.config();

const app = express();
const __dirname = path.resolve();

if (
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  throw new Error("❌ Cloudinary environment variables are missing");
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// app.use(
//   cors({
//     origin: process.env.CLIENT_URL,
//     credentials: true,
//   })
// );

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/notifications", notificationRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend", "dist")));

  app.get(/.*/, (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "frontend", "dist", "index.html")
    );
  });
}

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(" Database connection failed", err);
    process.exit(1);
  });
