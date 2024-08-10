import { Express, Request, Response , Router } from "express"
import Topic from "../../model/topic.model";
import Song from "../../model/song.controller";
import Singer from "../../model/singer.model";


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

export = {
    list,
}