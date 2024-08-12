import { Express, Request, Response , Router } from "express"
import Song from "../../model/song.controller"
import Singer from "../../model/singer.model"
import { convertToSlug } from "../../helpers/convertToSlug"


const result = async (req : Request, res : Response) => {
    const keyword: string = `${req.query.keyword}`;


    let listSongs = [];
    if(keyword){
        const keywordRegex = new RegExp(keyword, "i")

        // Tạo slug từ keyword
        const stringSlug = convertToSlug(keyword);
        const stringSlugRegex = new RegExp(stringSlug, "i")

        const songs = await Song.find({
            $or : [
                {title : keywordRegex},
                {slug : stringSlugRegex}
            ],
            deleted: false,
            status: "active",
        }).select("avatar title slug singerId like")

        for (const item of songs) {
            const singer = await Singer.findOne({
                _id: item.singerId,
                deleted: false,
                status: "active",
            })
            item["singer"] = singer
            listSongs.push(item);
        }
    }


    res.render("client/pages/search/result.pug", {
        pageTitle: `Kết quả: ${keyword}`,
        keyword: keyword,
        songs : listSongs,
    })
}

export = {
    result,
}