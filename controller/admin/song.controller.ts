import { Express, Request, Response , Router } from "express"
import Song from "../../model/song.controller"


const index = async (req : Request, res : Response) => {
    const songs = await Song.find({ deleted : false })

    res.render("admin/pages/songs/index.pug", {
        pageTitle : "Quản lý bài hát",
        songs : songs,
    })
}


export = {
    index,
}