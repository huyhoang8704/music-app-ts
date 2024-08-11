import { Router } from "express"
import controller from "../../controller/client/song.controller"
const router : Router = Router()



router.get('/:slugTopic', controller.list);

router.get('/detail/:slugSong', controller.detail);


export const songRoutes : Router = router;