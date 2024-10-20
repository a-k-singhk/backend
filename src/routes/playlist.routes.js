import { Router } from "express";

import { addVideoToPlaylist, createPlaylist, deletePlaylist, getPlaylistById, getUserPlaylist, removeVideoFromPlaylist, updatePlaylist } from "../controllers/playlist.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router=Router();

router.use(verifyJwt);

router.route("/").post(createPlaylist);

router.route("/:playlistId")
.get(getPlaylistById)
.patch(updatePlaylist)
.delete(deletePlaylist)

router.route("/add/:videoId/:playListId").patch(addVideoToPlaylist);
router.route("/remove/:videoId/:playlistId").patch(removeVideoFromPlaylist);

router.route("/user/:userId").get(getUserPlaylist);

export default router

