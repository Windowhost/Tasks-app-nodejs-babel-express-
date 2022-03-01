//Setting the users Models
import {Schema, model} from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new Schema({
    username: {type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: {type: String, required: true },
    isAdmin: { type: Boolean, default: false},
},  
    { timestamps: true },
);

// Metodo de imcriptacion 
UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

UserSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = model("User", UserSchema);