import { Express, Request, Response , Router } from "express"
import Topic from "../../model/topic.model"

const index = async (req : Request, res : Response) => {
    const topics = await Topic.find({
        deleted : false,
    })
    res.render("admin/pages/topics/index.pug", {
        pageTitle : "Quản lý chủ đề bài hát",
        topics : topics,
    })
}
const create = async (req : Request, res : Response) => {
    res.render("admin/pages/topics/create.pug", {
        pageTitle : "Tạo chủ đề bài hát",
    })
}
const createPOST = async (req : Request, res : Response) => {
    try {  
        const newTopic = new Topic(req.body);
        // console.log(req.body);

        await newTopic.save();
        // req.flash('success', 'Tạo danh mục sản phẩm thành công!');
        res.redirect("/admin/topics");
    } catch (error) {
        console.log(error)
    }
}


export = {
    index,
    create,
    createPOST,
}