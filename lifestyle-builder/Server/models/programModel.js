const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
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
    previousActivity: {
      type: Schema.Types.ObjectId,
      ref: 'activity',
      required: false
    },
    hasPreviousActivity: {
      type: Boolean,
      required: false
    },
    completed: {
      type: Boolean,
      required: false
    },
    day: {
      type: Number,
      required: true,
      default: 1
    },
    feedback: {
      type: String,
      required: false
    },
    result: {
      type: String,
      required: false
    },
  });
  
  // Rest of the code remains the same
  
const programSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required:true,
    },
    limtedDuration: {
        type: Number,
        required:false,
    },
    specialist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "specialists",
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
    },

    //for each day in the program, there is a list of activities for each day with date
    dailyActivities: [{
        day: {
            type: Number,
            required: true
        },
        activities: [{
            type: Schema.Types.ObjectId,
            ref: 'activity',
            required: true
        }]
    }],
    programStatus: {
        type: String,
        required: false,

    },
    startDate: {
        type: Date,
        required: true,
        default: Date.now,
      },

});

// Pre middleware to populate the dailyActivities field


const ProgramModel = model("programs",programSchema);
module.exports = ProgramModel;
