import express from "express";
import {
  getAllComments,
  postComment,
  getSingleComment,
  likeComment,
  getBlogComments,
} from "../controllers/commentController.js";

const commentRouter = express.Router();

// for testing
commentRouter.get("/", getAllComments);

// crud with comments
commentRouter.post("/post", postComment);
commentRouter.get("/blogcomment/:blogid", getBlogComments);
commentRouter.get("/get/:id", getSingleComment);
commentRouter.post("/like/:commentid", likeComment);

export default commentRouter;
