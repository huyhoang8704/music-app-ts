import { Router } from "express"
import controller from "../../controller/client/topic.controller"
const router : Router = Router()

import Topic from "../../model/topic.model"

router.get('/', controller.topics)


export const topicRoute : Router = router;