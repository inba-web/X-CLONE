import Notification from "../models/notification.model.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import cloudinary from "cloudinary";

export const createPost = async (req, res) => {
  try {
    const { text } = req.body;
    let { img } = req.body;
    const userId = req.user._id.toString();

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    if (!text && !img) {
      return res.status(400).json({ error: "Post must have Img or Text" });
    }

    if (img) {
      const uploadeResponse = await cloudinary.uploader.upload(img);
      img = uploadeResponse.secure_url;
    }

    const newPost = new Post({
      user: userId,
      text,
      img,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.log(`Error in create post controller ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findOne({ _id: id });

    if (!post) {
      res.status(404).json({ error: "Post not found" });
    }

    if (post.user.toString() != req.user._id.toString()) {
      res
        .status(401)
        .json({ error: "You are not authorized to delete this post" });
    }

    if (post.img) {
      const imgId = post.img.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(imgId);
    }

    await Post.findByIdAndDelete({ _id: id });
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log(`Error in delete post controller ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const commentPost = async (req, res) => {
  try {
    const { text } = req.body;
    const postId = req.params.id;
    const userId = req.user._id;

    if (!text) {
      res.status(400).json({ error: "Comment text is required" });
    }

    const post = await Post.findOne({ _id: postId });

    if (!post) {
      return res.status(400).json({ error: "Post not found" });
    }

    const comment = {
      user: userId,
      text: text,
    };

    post.comments.push(comment);
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    console.log(`Error in comment post controller ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const likeUnlikePost = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id: postId } = req.params;

    const post = await Post.findOne({ _id: id });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const userLikePost = post.likes.includes(userId);

    if (userLikePost) {
      // unlike post
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
      res.status(200).json({ message: "Post unliked successfully" });
    } else {
      // like post
      await Post.updateOne({ _id: postId }, { $push: { likes: userId } });
      await post.save();

      const notification = new Notification({
        from: userId,
        to: post.user,
        type: "like",
      });

      await notification.save();
      res.status(200).json({ message: "Post liked successfully" });
    }
  } catch (error) {
    console.log(`Error in likeUnlikePost controller : ${likeUnlikePost}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
