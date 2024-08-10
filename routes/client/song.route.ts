import { Router } from "express"
import controller from "../../controller/client/song.controller"
const router : Router = Router()



router.get('/:slugTopic', controller.list);


export const songRoutes : Router = router;