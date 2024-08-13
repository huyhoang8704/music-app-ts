import { Express, Request, Response , Router } from "express"

const index = async (req : Request, res : Response) => {

    res.render("admin/pages/dashboard/index.pug", {
        pageTitle : "Trang tổng quan"
    })
}


export = {
    index,
}