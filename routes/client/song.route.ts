import { Router } from "express"
import controller from "../../controller/client/song.controller"
const router : Router = Router()



router.get('/:slugTopic', controller.list);

router.get('/detail/:slugSong', controller.detail);

router.patch('/like/:typeLike/:idSong', controller.like);

router.patch('/favorite/:typefavorite/:idSong', controller.favorite);


export const songRoutes : Router = router;