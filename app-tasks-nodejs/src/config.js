//Inporting the configuration
import {config} from "dotenv"
config();

//Mongodb conection
export const MONGODB_URI = process.env.MONGODB_URI

//Setting the port
export const PORT = process.env.PORT || 9000