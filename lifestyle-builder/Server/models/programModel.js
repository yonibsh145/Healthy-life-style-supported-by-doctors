const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
const reviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
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
        dailyActivity: [activitySchema]
    }],
    startDate: {
        type: Date,
        required: true,
        default: Date.now,
      },
      endDate: {
        type: Date,
        required: false
      }

});

// Pre middleware to populate the dailyActivities field
programSchema.pre('save', function (next) {
  const program = this;

  // Calculate the end date based on the start date and duration
  const endDate = new Date(program.startDate);
  endDate.setDate(endDate.getDate() + program.duration);
  program.endDate = endDate;

  // Create daily activities array
  program.dailyActivities = [];

  // Populate daily activities for each day within the duration
  for (let i = 1; i <= program.duration; i++) {
    const dailyActivity = {
      day: i,
      activities: [],
    };
    program.dailyActivities.push(dailyActivity);
  }

  // Assign activities to their respective day
  program.activities.forEach((activity) => {
    const day = activity.day;
    if (day >= 1 && day <= program.duration) {
      // Add activity ID to program.dailyActivities
      program.dailyActivities[day - 1].dailyActivity.push(activity);
    }
  });

  next();
});



const ProgramModel = model("programs",programSchema);
module.exports = ProgramModel;
