import { Express, Request, Response , Router } from "express"
import Song from "../../model/song.controller"
import Topic from "../../model/topic.model"
import Singer from "../../model/singer.model"
import { systemConfig } from "../../config/system";

const index = async (req : Request, res : Response) => {
    const songs = await Song.find({ deleted : false })

    res.render("admin/pages/songs/index.pug", {
        pageTitle : "Quản lý bài hát",
        songs : songs,
    })
}
const create = async (req : Request, res : Response) => {
    const topics = await Topic.find({ deleted : false , status : "active" }).select("title")
    const singers = await Singer.find({ deleted : false , status : "active" }).select("fullName")
    res.render("admin/pages/songs/create.pug", {
        pageTitle : "Tạo bài hát",
        topics : topics,
        singers : singers,
    })
}
const createPOST = async (req : Request, res : Response) => {
    if(req.body.avatar) {
        req.body.avatar = req.body.avatar[0];
    }

    if(req.body.audio) {
        req.body.audio = req.body.audio[0];
    }

    const song = new Song(req.body);
    // await song.save();
    console.log(song)

    res.redirect(`/${systemConfig.prefixAdmin}/songs`);
}


export = {
    index,
    create,
    createPOST,
}