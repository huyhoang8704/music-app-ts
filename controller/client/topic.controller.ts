import { Express, Request, Response , Router } from "express"
import Topic from "../../model/topic.model"


const topics = async (req : Request, res : Response) => {
    const topics = await Topic.find({
        deleted : false,
    })


    res.render("client/pages/topics/index.pug",)
}

export = {
    topics,
}