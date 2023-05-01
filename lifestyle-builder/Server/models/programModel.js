import mongoose, { Schema, model } from "mongoose";
const programSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required:true,
    },
    endDate: {
        type: Date,
        required:true,
    },
    specailist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "specailists",
        required:true,
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required:true,
    }]
});
