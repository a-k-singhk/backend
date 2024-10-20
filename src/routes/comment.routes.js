import { Router } from "express";
import {addComment, deleteComment, getVideoComments, updateComment} 
from '../controllers/comment.controller.js'; 
import { verifyJwt } from "../middlewares/auth.middleware";
 const router=Router();

 router.route(verifyJwt);

 router.route("/:videoId").get(getVideoComments).post(addComment);
 router.route("/c/:commentId").delete(deleteComment).patch(updateComment);

 export default router