//Modules import
import {Router} from "express";
import * as tasksCtr from "../controllers/tasks.controller";
const router = Router();
const {isAuthenticated} = require("../helpels/auth")

//Render the Taks Index Page
router.get("/add", isAuthenticated, tasksCtr.tasksIndexCtr);
//Manage the tasks data form
router.post("/add", isAuthenticated, tasksCtr.tasksPostCtr);

//Render my Tasks Page
router.get("/myTasks",isAuthenticated, tasksCtr.myTasksCtr);

//Funcion que renderiza el formulario para editar
router.get("/edit/:id", isAuthenticated, tasksCtr.renderEditCtr);
router.post("/edit/:id", isAuthenticated, tasksCtr.updateTasksCtr);

// Ruta para eliminar un id especifico
router.get("/delete/:id", isAuthenticated, tasksCtr.deleteTasks);

//Ruta que maneja la logica del botton done
router.get("/toggleDone/:id", isAuthenticated, tasksCtr.doneToggleTasks);
 
//Exporting the router
export default router;