import express , { Express , Request , Response } from "express";
import dotenv from 'dotenv';
import path from "path";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import session from 'express-session';
import flash from 'flash';
import * as database from './config/database';


import clientRoutes from "./routes/client/index.route";
import adminRoutes from "./routes/admin/index.route";
import { systemConfig } from "./config/system";

const app : Express  = express()
const port : number | string = process.env.PORT || 3000;

app.set('views','./views');
app.set('view engine', 'pug');

// Dotenv
dotenv.config();
// Connect DB
database.connect();
// File tĩnh
app.use(express.static('public'));
// bodyParse req.body
app.use(bodyParser.urlencoded({ extended: false }))
// express-flash  // thông báo
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash())

// TinyMCE
app.use(
    "/tinymce",
    express.static(path.join(__dirname, "node_modules", "tinymce"))
  );


// App local variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// Connect Routes
clientRoutes(app);
adminRoutes(app);


app.listen(port , () =>{
    console.log(`App listening on port ${port}`);
})