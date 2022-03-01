// Estableciendo el modelo de las Tasks
import {Schema, model} from 'mongoose';

const taskSchema = new Schema({
    title: { type: 'string', required: true, unique: true,trim: true},
    description: { type: 'string', required: true, trim: true},
    done: { type: 'boolean', default: false},
    user: { type: String },
    },
        { timestamps: true },
    );

//Exportando el modelo de los datos(Este se usasara en router)
export default model("Tasks", taskSchema);