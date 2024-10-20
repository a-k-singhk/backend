import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { 
    getSubscribedChannels, 
    getuserChannelSubscribers, 
    toogleSubscription 
} from '../controllers/subscription.controller.js';

const router=Router();
router.use(verifyJwt);

router
.route("/c/:channelId")
.get(getSubscribedChannels)
.post(toogleSubscription);

router
.route("/u/:subscriberId")
.get(getuserChannelSubscribers);

export default router