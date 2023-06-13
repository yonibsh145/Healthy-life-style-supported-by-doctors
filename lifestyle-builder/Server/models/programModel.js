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
    createBy: { 
        type: Schema.Types.ObjectId, 
        ref: 'specialists',
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
    date: {
        type: Date,
        required: true,
        default: Date.now,
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
        date: {
            type: Date,
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
        required: true,

    },

});

// Pre middleware to populate the dailyActivities field
programSchema.pre('save', function (next) {
    const activitiesByDate = {};
    this.activities.forEach((activity) => {
      const date = activity.date.toDateString(); // Convert date to a string for grouping
      if (!activitiesByDate[date]) {
        activitiesByDate[date] = [];
      }
      activitiesByDate[date].push(activity._id);
    });
  
    this.dailyActivities = Object.entries(activitiesByDate).map(([date, activities]) => ({
      date: new Date(date),
      activities,
    }));
  
    next();
  });


const ProgramModel = model("programs",programSchema);
module.exports = ProgramModel;
