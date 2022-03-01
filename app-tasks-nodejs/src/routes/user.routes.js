//Modules import
import {Router} from "express";
import * as userCtr from "../controllers/user.controller";
const {isAuthenticated} = require("../helpels/auth");

const router = Router();

router.get("/register", userCtr.registerCtr);

router.get("/login", userCtr.loginCtr);

router.post("/register", userCtr.userResgisterCrt);

//Contact Form
router.get("/contacts", userCtr.contactsCtr);

// router.post("/login", userCtr.signinCtr);
router.post("/login", userCtr.signinCtr);

router.get("/logout", userCtr.userLogout);

export default router;