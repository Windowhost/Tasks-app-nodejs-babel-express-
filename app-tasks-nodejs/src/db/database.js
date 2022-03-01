// Setting the connection to mongodb
import {connect} from "mongoose";
import {MONGODB_URI} from "../config"

(async() =>{
    try {
         const db = await connect(MONGODB_URI);
        console.log("DB is connected to:", db.connection.name);

    } catch (error) {
        console.error("Error With the connection:", error)
    }
})();