import { Express, Request, Response , Router } from "express"

// import controller from "../controller/task.controller"
const router : Router = Router()

import Topic from "../../model/topic.model"

router.get('/', async (req : Request, res : Response) => {
    const topics = await Topic.find({
        deleted : false,
    })


    
    res.render("client/pages/topics/index.pug",)
})


export const topicRoute : Router = router;