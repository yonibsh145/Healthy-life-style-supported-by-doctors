const Program = require('../models/programModel');
const User = require('../models/userModel');
const Specialist = require('../models/specialistsModel');
const asyncHandler = require('express-async-handler');

//@desc     Create a new program by specialist
//@route    POST /api/programs
//@access   Public
const createProgram = asyncHandler(async (req, res) => {
  const { name, duration, specialist, activities, kindOfProgram, description } = req.body;

  if (!name || !duration || !specialist || !activities || !kindOfProgram || !description) {
    res.status(400).json({ message: "Please fill all fields" });
    return;
  }

  try {
    // Check if the specialist exists
    const existingSpecialist = await Specialist.findById(specialist);
    if (!existingSpecialist) {
      res.status(404).json({ message: "Specialist not found" });
      return;
    }

    // Convert activities to match the activity schema
    const convertedActivities = activities.map(activity => ({
      name: activity.name,
      description: activity.description,
      duration: activity.duration,
      previousActivity: activity.previousActivity,
      hasPreviousActivity: activity.hasPreviousActivity,
      completed: activity.completed,
      day: activity.day,
      feedback: activity.feedback,
      result: activity.result
    }));

    // Create the program without setting the startDate field
    const program = await Program.create({
      name,
      duration,
      specialist,
      activities: convertedActivities,
      kindOfProgram,
      description,
    });

    if (program) {
      // Update the specialist's programs array which conatins the program id and the program name
      existingSpecialist.programs.push(program._id);
      await existingSpecialist.save();


      res.status(200).json({ message: "Program created successfully", program });
    } else {
      res.status(400).json({ message: "Invalid program data" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});


//@desc     get all programs
//@route    GET /api/programs
//@access   Public
const getAllPrograms = asyncHandler(async (req, res) => {
  try {
    const programs = await Program.find({});
    res.status(200).json(programs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//@desc     get program by id
//@route    GET /api/programs/program
//@access   Public
const getProgramById = asyncHandler(async (req, res) => {
  const { programId } = req.query;
  console.log(programId);
  const program = await Program.findById(programId);
  if (program) {
    res.json(program);
  } else {
    res.status(404).json({ message: "Program not found" });
  }
});

//@desc     add review to program by user
//@route    POST /api/programs/addReview
//@access   Public
const addReview = asyncHandler(async (req, res) => {
  const { userId, programId, rating, comment } = req.body;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.programs.some((program) => program.program.toString() === programId)) {
      return res.status(400).json({ message: "You can't review a program you are not doing" });
    }

    const program = await Program.findById(programId).populate('reviews.user');
    console.log(program.reviews)
    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    const alreadyReviewed = program.reviews.find(review => review.user._id.toString() === userId);
    if (alreadyReviewed) {
      return res.status(400).json({ message: "Program already reviewed" });
    }

    const review = {
      user: user._id,
      rating: Number(rating),
      comment: comment,
    };

    program.reviews.push(review);
    program.numOfReviews = program.reviews.length;
    program.rating = program.reviews.reduce((acc, item) => item.rating + acc, 0) / program.reviews.length;
    await program.save();

    res.status(200).json({ message: "Review added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});


//@desc     get program url by program id
//@route    GET /api/programs/program-url/:id
//@access   Public
const getProgramUrl = asyncHandler(async (req, res) => {
  const program = await Program.findById(req.params.id);
  if (program) {
    res.json(program.url);
  } else {
    res.status(404).json({ message: "Program not found" });
  }
});

//@desc     get program daily activities by program id
//@route    GET /api/programs/program-daily-activities
//@access   Public
const getDailyActivities = async (req, res) => {
  const { userId } = req.body;

  try {
    // Find the user
    const user = await User.findById(userId).populate({
      path: 'programs',
      match: { programStatus: 'Active' }, // Filter active programs only
      populate: {
        path: 'activities',
        match: { day: getCurrentDay() }, // Filter activities for the current day
        populate: { path: 'previousActivity' } // Populate previousActivity field in activitySchema
      }
    }).exec();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const currentDay = getCurrentDay();

    const dailyActivities = user.programs.reduce((result, program) => {
      if (currentDay <= program.duration) {
        const activities = program.activities.filter(activity => activity.day === currentDay);
        if (activities.length > 0) {
          result.push({
            programName: program.name,
            activities
          });
        }
      }
      return result;
    }, []);

    res.status(200).json({ dailyActivities });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getCurrentDay = () => {

  const currentDay = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000)) + 1;
  return currentDay;
};


//@desc     edit program details by program id
//@route    PUT /api/programs/edit-program
//@access   Public
const editProgram = asyncHandler(async (req, res) => {
  //want that details will be shown in the edit form
  const programId = req.body.programId;
  const program = await Program.findById(programId);
  if (program) {
    program.name = req.body.name || program.name;
    program.description = req.body.description || program.description;
    program.kindOfProgram = req.body.category || program.category;
    program.duration = req.body.duration || program.duration;
    program.activities = req.body.activities || program.activities;
    const updatedProgram = await program.save();
    res.json(updatedProgram);
  } else {
    res.status(404).json({ message: "Program not found" });
  }
});

//@desc     update program details by program id
//@route    PUT /api/programs/update-program/:id
//@access   Public

//@desc     Delete program by program ID
//@route    DELETE /api/programs/delete-program
//@access   Public
const deleteProgram = asyncHandler(async (req, res) => {
  const programId = req.body.programId;

  try {
    // Find the program by ID
    const program = await Program.findById(programId);
    if (!program) {
      res.status(404).json({ message: "Program not found" });
      return;
    }

    // Check if the requesting specialist created the program
    if (program.specialist.toString() !== req.body.specialistId) {
      res.status(401).json({ message: "Unauthorized to delete this program" });
      return;
    }

    // Delete the program
    await Program.findByIdAndDelete(programId);

    res.status(200).json({ message: "Program deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//@desc     get all program reviews
//@route    GET /api/programs/all-programs
//@access   Public
const getAllReviews = asyncHandler(async (req, res) => {
  const {programId} = req.query;
  console.log(programId);
  try{
    const program = await Program.findById(programId).populate({
      path: 'reviews.user',
      select: 'username', // Populate 'name' and 'email' fields of the user document
    });
    console.log(program);
    if(!program){
      res.status(404).json({ message: "Program not found" });
      return;
    }
    res.json(program.reviews);
  }catch(error){
    console.error(error);
    res.status(500).json({ message: "Server Error" });

  }
  res.json(programs);
});


module.exports = {
  getProgramById,
  createProgram,
  //getSpecialistPrograms,
  addReview,
  getProgramUrl,
  getDailyActivities,
  editProgram,
  deleteProgram,
  getAllPrograms,
  getAllReviews
};