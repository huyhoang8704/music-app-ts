import { Express, Request, Response , Router } from "express"
import Topic from "../../model/topic.model";
import Song from "../../model/song.controller";
import Singer from "../../model/singer.model";
import FavoriteSong from "../../model/favorite-song.model";


const list = async (req : Request, res : Response) => {
    // console.log(req.params.slugTopic);
    const topic = await Topic.findOne({
        slug : req.params.slugTopic,
        status : "active",
        deleted : false
    })
    // console.log(topic);
    const songs = await Song.find({
        topicId : topic.id,
        status : "active",
        deleted : false
    }).select("avatar title slug singerId like")
    // console.log(songs)
    for(const song of songs) {
        const infosinger = await Singer.findOne({
            _id : song.singerId,
            status : "active",
            deleted : false
        })
        song["infosinger"] = infosinger;
    }

    res.render("client/pages/songs/list.pug", {
        pageTitle : topic.title ,
        songs : songs
    })
}
const detail = async (req : Request, res : Response) => {
    const slug = req.params.slugSong
    const song = await Song.findOne({
        slug : slug,
        status : "active",
        deleted : false
    })
    const singerId = song.singerId
    const singer = await Singer.findOne({
        _id : singerId,
        status : "active",
        deleted : false
    }).select("fullName avatar")
    const topicId = song.topicId
    const topic = await Topic.findOne({
        _id : topicId,
        status : "active",
        deleted : false
    }).select("title")

    const favoriteSong = await FavoriteSong.findOne({
        songId : song.id,
    })
    song["favorite"] = favoriteSong ? true : false

    res.render("client/pages/songs/detail.pug", {
        pageTitle : song.title,
        song : song,
        singer : singer,
        topic : topic,
    })
}
const like = async (req, res : Response) => {
    const idSong : string = req.params.idSong
    const typeLike : string = req.params.typeLike

    const song = await Song.findOne({
        _id : idSong,
        status : "active",
        deleted : false
    }).select("like")

    const newLike : number = typeLike == "like" ? song.like + 1 : song.like - 1
    await Song.updateOne({
        _id : idSong
    }, {
        $set : {
            like : newLike
        }
    })
    res.json({
        code : 200,
        message : "Success!",
        newLike : newLike
    })

}
const favorite = async (req, res : Response) => {
    const idSong : string = req.params.idSong
    const typefavorite : string = req.params.typefavorite

    switch (typefavorite) {
        case "favorite":
            const exist = await FavoriteSong.findOne({
                songId : idSong
            })
            if(!exist) {
                const record = new FavoriteSong({
                    // userId : "", // Làm tính năng đăng nhập thì thêm userId
                    songId : idSong
                })
                await record.save();
            }
            break;
        case "unfavorite":
            await FavoriteSong.deleteOne({
                songId : idSong
            })
            break;
    
        default:
            break;
    }
    res.json({
        code : 200, 
        message : "Success!"
    })

}
const listen = async (req, res : Response) => {
    const idSong : string = req.params.idSong
    const song = await Song.findOne({
        _id : idSong,
        status : "active",
        deleted : false
    })
    const newListen = song.listen + 1;

    await Song.updateOne({
        _id : idSong
    }, {
        $set : {
            listen : newListen
        }
    })
    // console.log(newListen);
    res.json({
        code : 200,
        message : "Success!",
        newListen : newListen
    })

}

export = {
    list,
    detail,
    like,
    favorite,
    listen,
}