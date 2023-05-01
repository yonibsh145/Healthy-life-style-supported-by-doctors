import { Schema, model } from "mongoose";
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required:true,
    }
});

const UserModel = model("users",UserSchema);
export default UserModel;