import { Router } from "express"
import controller from "../../controller/admin/song.controller"
const router : Router = Router()


router.get('/', controller.index)



export const songRoute : Router = router;