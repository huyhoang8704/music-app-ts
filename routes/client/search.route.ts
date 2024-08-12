import { Router } from "express"
import controller from "../../controller/client/search.controller"
const router : Router = Router()



router.get('/result', controller.result);



export const searchRoute : Router = router;