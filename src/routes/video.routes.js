import { Router } from "express";

import {
    deleteVideo,
    getAllVideos,
    getvideoById,
    publishVideo,
    tooglePublishStatus,
    updateVideo
} from "../controllers/video.controller.js"

import { verifyJwt } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router=Router();

router.use(verifyJwt);

router
.route("/")
.get(getAllVideos)
.post(
    upload.fields([
        {
            name:"videoFile",
            maxCount:1
        },
        {
            name:"thumbnail",
            maxCount:1
        },
    ]),
    publishVideo
);
router
.route("/:videoId")
.get(getvideoById)
.delete(deleteVideo)
.patch(upload.single("thumbnail"),updateVideo);

router
.route("/toggle/publish/:videoId")
.patch(tooglePublishStatus);

export default router