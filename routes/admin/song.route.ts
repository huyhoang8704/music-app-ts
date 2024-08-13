import { Router } from "express"
import controller from "../../controller/admin/song.controller"
const router : Router = Router()


router.get('/', controller.index)

router.get('/create', controller.create)



export const songRoute : Router = router;