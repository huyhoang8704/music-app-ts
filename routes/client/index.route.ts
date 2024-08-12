import { Express } from "express";
import { topicRoute } from "./topic.route";
import { songRoutes } from "./song.route";
import { favoriteSongRoute } from "./favorite-song.route";
import searchController from "../../controller/client/search.controller";
import { searchRoute } from "./search.route";

const clientRoutes = (app : Express) : void => {
    app.use("/topics",topicRoute);

    app.use("/songs",songRoutes);

    app.use("/favorite-songs",favoriteSongRoute);

    app.use("/search",searchRoute);

};

export default clientRoutes;