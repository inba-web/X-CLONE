import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import cloudinary from "cloudinary"

export const createPost = async (req,res) => {
    try {
        
        const {text} = req.body;
        let {img} = req.body;
        const userId = req.user._id.toString();

        const user = await User.findById(userId) 

        if(!user){
            return res.status(400).json({error:"User not found"})
        }

        if(!text && !img){
            return res.status(400).json({error:"Post must have Img or Text"})
        }

        if(img){
            const uploadeResponse = await cloudinary.uploader.upload(img);
            img = uploadeResponse.secure_url; 
        }

        const newPost = new Post({
            user : userId,
            text,
            img
        })

        await newPost.save();
        res.status(201).json(newPost);

    } catch (error) {
        console.log(`Error in create post controller ${error}`)
        res.status(400).json({error:"Internal Server Error"})
    }
}

