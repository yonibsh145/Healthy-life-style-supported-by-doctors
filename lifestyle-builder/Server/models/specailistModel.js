import { Schema, model } from "mongoose";
const specailstSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required:true,
    },
    password: {
        type: String,
        required:true,
    },
    email: {
        type: String,
        required:true,
    },
    age: {
        type: Number,
        required:true,
    }
});

const specailtModel = model("users",specailstSchema);
export default specailtModel;