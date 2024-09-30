import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts); // grab user feed ont the homepage
router.get("/:userId/posts", verifyToken, getUserPosts); // grabbing only the users posts in their profile


/* UPDATE */
router.patch("/:id/like", verifyToken, likePost); // liking and unliking posts
export default router;

