import { Router } from "express"
import controller from "../../controller/admin/dashboard.controller"
const router : Router = Router()


router.get('/', controller.index)


export const dashboardRoute : Router = router;