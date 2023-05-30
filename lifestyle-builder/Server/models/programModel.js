const { time } = require("console");
const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
const { URL } = require('url');
const reviewSchema = new Schema({
    review: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: false
    }

});
const activitySchema = new Schema({
    name: {
        type: String,
        required: true
        
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    createBy: { 
        type: Schema.Types.ObjectId, 
        ref: 'specialist',
        required: true 
    },
    //check if activity has previous activity that must be completed before starting this activity
    previousActivity: {
        type: Schema.Types.ObjectId,
        ref: 'activity',
        required: false
    },
    //check if the previous activity been completed
    hasPreviousActivity: {
        type: Boolean,
        required: false
    },
    //check if the activit been completed
    completed: {
        type: Boolean,
        required: false
    },
    

}); 
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
        required:false,
    },
    limtedDuration: {
        type: Number,
        required:false,
    },
    specailist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "specailists",
        required:true,
    },
    activities: [activitySchema],
    linkforProgram: {
        type: String,
        required: false,
    },
    kindOfProgram: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    //check if the program been completed
    completed: {
        type: Boolean,
        required: false
    },
    //check if the program been activated
    activated: {
        type: Boolean,
        required: false
    },
    //check if the program been deactivated
    deactivated: {
        type: Boolean,
        required: false
    },
    reviews: [reviewSchema],
    numOfReviews: {
        type: Number,
        required: true,
        default: 0
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    }
});



const ProgramModel = model("programs",programSchema);
module.exports = ProgramModel;

