import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username: {type: String, require: true, unique: true},
    password: {type: String, require: true},
})

const User = model('user', userSchema)

export default User;