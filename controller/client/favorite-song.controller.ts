import { Express, Request, Response , Router } from "express"
import FavoriteSong from "../../model/favorite-song.model"
import Song from "../../model/song.controller"
import Singer from "../../model/singer.model"


const index = async (req : Request, res : Response) => {
    const favoriteSongs = await FavoriteSong.find({
        deleted : false
    })
    for (const item of favoriteSongs) {
        const song = await Song.findOne({
            _id : item.songId,
            deleted : false,
            status : "active"
        })
        item["song"] = song
        const singer = await Singer.findOne({
            _id : song.singerId,
            deleted : false,
            status : "active"
        })
        item["singer"] = singer
    }
    // console.log(favoriteSongs);
    res.render("client/pages/favorite-songs/index.pug", {
        pageTitle : "Bài hát yêu thích",
        favoriteSongs : favoriteSongs
    })
}

export = {
    index,
}