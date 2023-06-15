const Program = require('../models/programModel');
const User = require('../models/userModel');
const Specialist = require('../models/specialistsModel');
const asyncHandler = require('express-async-handler');

//@desc     Create a new program by specialist
//@route    POST /api/program
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
      Error('error');
      res.status(404).json({ message: "Specialist not found" });
      return;
    }

    // Create the program without setting the startDate field
    const program = await Program.create({
      name,
      duration,
      specialist,
      activities,
      kindOfProgram,
      description,
    });

    if (program) {
      // Update the specialist's programs array
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

/*//@desc     create activity to program by specialist
//@route    POST /api/program/addActivity
//@access   Private
const addActivity = asyncHandler(async (req, res) => {
    const { name, description, duration, type, intensity } = req.body;
    const programId = req.body.programId;
*/


//@desc     get all programs
//@route    GET /api/program
//@access   Public
const getAllPrograms = asyncHandler(async (req, res) => {
    const programs = await Program.find({});
    res.json(programs);
}
);

//@desc     get program by id
//@route    GET /api/program/:id
//@access   Public
const getProgramById = asyncHandler(async (req, res) => {
    const program = await Program.findById(req.params.id);
    if(program){
        res.json(program);
    }else{
        res.status(404).json({message: "Program not found"});
    }
});


//@desc     get all programs by specialist id
//@route    GET /api/program/specialist-programs/:id
//@access   Private
const getSpecialistPrograms = asyncHandler(async (req, res) => {
    const programs = await Program.find({specialist: req.params.id});
    res.json(programs);
}
);

//@desc     add review to program by user
//@route    POST /api/program/:id/reviews
//@access   Private
const addReview = asyncHandler(async (req, res) => {
    const {rating, comment} = req.body;
    const program = await Program.findById(req.params.id);
    if(program){
        const alreadyReviewed = program.reviews.find(r => r.user.toString() === req.user._id.toString());
        if(alreadyReviewed){
            res.status(400).json({message: "Program already reviewed"});
        }
        const review = {
            name: req.user.username,
            rating: Number(rating),
            comment,
            user: req.user._id
        }
        program.reviews.push(review);
        program.numOfReviews = program.reviews.length;
        program.rating = program.reviews.reduce((acc, item) => item.rating + acc, 0) / program.reviews.length;
        await program.save();
        res.status(200).json({message: "Review added"});
    }else{
        res.status(404).json({message: "Program not found"});
    }
});

//@desc     get program url by program id
//@route    GET /api/program/program-url/:id
//@access   Private
const getProgramUrl = asyncHandler(async (req, res) => {
    const program = await Program.findById(req.params.id);
    if(program){
        res.json(program.url);
    }else{
        res.status(404).json({message: "Program not found"});
    }
});

//@desc     get program daily activities by program id
//@route    GET /api/program/program-daily-activities/:id
//@access   Private
const getDailyActivities = async (req, res) => {
  const userId = req.user._id;
  const programId = req.params.id;

  try {
    // Find the user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the active program for the user
    const activeProgram = await Program.findOne({
      _id: programId,
      specialist: req.user._id,
      programStatus: 'Active',
    })
      .populate({
        path: 'activities',
        model: 'activity',
      })
      .exec();

    if (!activeProgram) {
      return res.status(404).json({ message: 'Active program not found' });
    }

    const currentDay = Math.floor((Date.now() - activeProgram.startDate) / (24 * 60 * 60 * 1000)) + 1;

    if (currentDay > activeProgram.duration) {
      // Program duration exceeded, change program status to 'Done'
      activeProgram.programStatus = 'Done';
      await activeProgram.save();
      return res.status(200).json({ message: 'Program duration exceeded', programStatus: 'Done' });
    }

    const dailyActivities = [];

    // Retrieve the activities for the current day from each active program
    for (const program of user.programs) {
      if (program.programStatus === 'Active') {
        const dailyActivity = program.dailyActivities.find(da => da.day === currentDay);

        if (dailyActivity) {
          dailyActivities.push({
            program: {
              _id: program._id,
              name: program.name,
              status: program.programStatus,
              startDate: program.startDate,
              endDate: program.endDate,
              description: program.description,
              // Include other program fields as needed
            },
            activities: dailyActivity.activities,
          });
        }
      }
    }

    res.status(200).json({ dailyActivities });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


//@desc     edit program details by program id
//@route    PUT /api/program/edit-program/:id
//@access   Private
const editProgram = asyncHandler(async (req, res) => {
    //want that details will be shown in the edit form

    const program = await Program.findById(req.params.id);
    if(program){
        program.name = req.body.name || program.name;
        program.description = req.body.description || program.description;
        program.url = req.body.url || program.url;
        program.price = req.body.price || program.price;
        program.category = req.body.category || program.category;
        program.image = req.body.image || program.image;
        program.specailist = req.body.specialist || program.specialist;
        program.numOfRatings = req.body.numReviews || program.numOfRatings;
        program.rating = req.body.rating || program.rating;
        program.reviews = req.body.reviews || program.reviews;
        program.activities = req.body.activities || program.activities;
        const updatedProgram = await program.save();
        res.json(updatedProgram);
    }else{
        res.status(404).json({message: "Program not found"});
    }
});

//@desc     update program details by program id
//@route    PUT /api/program/update-program/:id
//@access   Private
const updateProgram = asyncHandler(async (req, res) => {
    const program = await Program.findById(req.params.id);
    if(program){
        program.name = req.body.name || program.name;
        program.description = req.body.description || program.description;
        program.activities = req.body.activities || program.activities;
        const updatedProgram = await program.save();
        res.json(updatedProgram);
    }else{
        res.status(404).json({message: "Program not found"});
    }
});

  

module.exports = {createProgram, getAllPrograms, getProgramById, getSpecialistPrograms, addReview, getProgramUrl, getDailyActivities, editProgram};