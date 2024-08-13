import { Express } from "express";
import { dashboardRoute } from "./dashboard.route";
import { systemConfig } from "../../config/system";
import { topicRoute } from "./topic.route";
import { songRoute } from "./song.route";

const adminRoutes = (app : Express) : void => {
    const PATH = `/${systemConfig.prefixAdmin}`;
    app.use(`${PATH}/dashboard`, dashboardRoute);

    app.use(`${PATH}/topics`, topicRoute);

    app.use(`${PATH}/songs`, songRoute);
};

export default adminRoutes;