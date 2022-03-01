//Modules import
import express from "express";
import path from "path";
import morgan from "morgan";

import {engine} from "express-handlebars";
// import session from 'express-session';
import session from 'cookie-session';
import flash from 'connect-flash';
import passport from "passport";

import userRouter from "./routes/user.routes";
import mainRouter from "./routes/main.routes";
import tasksRouter from "./routes/tasks.routes";


//Inicializacion
const app = express();
require("./helpels/veryfyToken");

//Settings
app.set("views", path.join(__dirname, "views"))
app.engine('handlebars', engine({
    layoutDir: path.join( app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    defaultLayout: "main",
    etxname:"handlebars",
}));
app.set("view engine", ".handlebars");

//Midleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Save the user in a section
app.use(session({
    secret: "mysecretKeyLogin",
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize())
app.use(passport.session())
app.use(flash());


//Global Variables
app.use((req, res, next) =>{
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    res.locals.user = req.user || null;
    next()
});


//Routes
app.use( mainRouter);
app.use("/users", userRouter);
app.use("/tasks", tasksRouter);


//Statics Files
app.use(express.static(path.join(__dirname, "public")));

export default app;