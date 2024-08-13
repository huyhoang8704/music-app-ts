import { Router } from "express"
import controller from "../../controller/admin/topic.controller"
const router : Router = Router()


router.get('/', controller.index)

router.get('/create', controller.create)

router.post('/create', controller.createPOST)


export const topicRoute : Router = router;