import { Express, Request, Response , Router } from "express"
import Song from "../../model/song.controller"
import Singer from "../../model/singer.model"
import { convertToSlug } from "../../helpers/convertToSlug"


const result = async (req : Request, res : Response) => {
    const type = req.params.type
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
            // item["singer"] = singer

            // listSongs.push(item);
            listSongs.push({
                id: item.id,
                avatar: item.avatar,
                title: item.title,
                like: item.like,
                slug: item.slug,
                singer: {
                  fullName: singer.fullName
                },
              });
        }
    }


    if(type == "result") {
        res.render("client/pages/search/result.pug", {
            pageTitle: `Kết quả: ${keyword}`,
            keyword: keyword,
            songs : listSongs,
        })
    }  else if (type == "suggest") {
        res.json({
            code : 200,
            songs : listSongs
        })
    }
}

export = {
    result,
}