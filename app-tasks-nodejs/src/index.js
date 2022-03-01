//Modules import
import app from "./app";
import "./db/database"
import {PORT} from "./config"


//Port listener
app.listen(PORT, () =>{
    console.log("Server listen on Port:", PORT)
})
