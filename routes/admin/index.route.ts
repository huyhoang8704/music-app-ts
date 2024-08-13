import { Express } from "express";
import { dashboardRoute } from "./dashboard.route";
import { systemConfig } from "../../config/system";

const adminRoutes = (app : Express) : void => {
    const PATH = `/${systemConfig.prefixAdmin}`;
    app.use(`${PATH}/dashboard`, dashboardRoute);
};

export default adminRoutes;