import { Express } from "express";
import { topicRoute } from "./topic.route";
import { songRoutes } from "./song.route";
import { favoriteSongRoute } from "./favorite-song.route";

const clientRoutes = (app : Express) : void => {
    app.use("/topics",topicRoute);

    app.use("/songs",songRoutes);

    app.use("/favorite-songs",favoriteSongRoute);

};

export default clientRoutes;