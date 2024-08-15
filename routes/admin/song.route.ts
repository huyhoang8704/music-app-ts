import { Router } from "express"
import multer from "multer";
import controller from "../../controller/admin/song.controller"

import * as uploadCloud from "../../middlewares/admin/uploadCloud.middleware";
const router : Router = Router()

const upload = multer();

router.get('/', controller.index)

router.get('/create', controller.create)

router.post(
    "/create", 
    upload.fields(
      [
        { name: 'avatar', maxCount: 1 },
        { name: 'audio', maxCount: 1 }
      ]
    ), 
    uploadCloud.uploadFields,
    controller.createPOST
  );



export const songRoute : Router = router;