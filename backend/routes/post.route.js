import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  createPost,
  deletePost,
  commentPost,
  likeUnlikePost,
  getAllPosts,
  getLikedPosts,
  getFollowingPosts,
  getUserPost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.get("/likes/:id", protectRoute, getLikedPosts);
router.get("/following", protectRoute, getFollowingPosts);
router.get("/user/:username", protectRoute, getUserPost);
router.get("/all", protectRoute, getAllPosts);
router.post("/create", protectRoute, createPost);
router.post("/like/:id", protectRoute, likeUnlikePost);
router.post("/comment/:id", protectRoute, commentPost);
router.delete("/:id", protectRoute, deletePost);

export default router;
