//Modules import
import {Router} from "express";
import { indexAbut, indexHome } from "../controllers/main.controller";
const router = Router();
const {isAuthenticated} = require("../helpels/auth")

//Render the Index Page
router.get("/", indexHome);

//Render the About Page
router.get("/about", indexAbut);

//Exporting the router
export default router;