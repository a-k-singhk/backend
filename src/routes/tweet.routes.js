import { Router } from "express";
import { createTweet, deleteTweet, getuserTweet, updateTweet } from '../controllers/tweet.controller'

import { verifyJwt } from "../middlewares/auth.middleware";

const router=Router();

router.use(verifyJwt);

router.route("/").post(createTweet);
router.route("/user/:userId").get(getuserTweet);
router.route("/:tweetId").patch(updateTweet).delete(deleteTweet);

export default router