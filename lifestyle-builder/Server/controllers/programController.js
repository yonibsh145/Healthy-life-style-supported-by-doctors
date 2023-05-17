const Program = require('../models/programModel');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

//@desc     create a new program only by specialist
//@route    POST /api/program
//@access   Private
const createProgram = asyncHandler(async (req, res) => {
    const {name, description, duration, price, image} = req.body;
    const program = new Program({
        name,
        description,
        duration,
        price,
        image,
        specialist: req.specialist._id
    });
    const createdProgram = await program.save();
    res.status(201).json(createdProgram);
});

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

/*
//@desc     active program for a user by program id
//@route    PUT /api/program/activate-program/:id
//@access   Private
const activateProgram = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if(user){
        user.program = req.body.programId;
        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            username: updatedUser.username,
            email: updatedUser.email,
            medicalHistory: updatedUser.medicalHistory,
            program: updatedUser.program,
            token: generateToken(updatedUser._id)
        })
    }else{
        res.status(404).json({message: "User not found"});
    }
});

//@desc     deactivate program for a user by program id
//@route    PUT /api/program/deactivate-program/:id
//@access   Private
const deactivateProgram = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if(user){
        //check if user has a active program
        if(!user.program){
            res.status(400).json({message: "User does not have an active program"});
        }else{
            user.program = null;
            const updatedUser = await user.save();
             res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                username: updatedUser.username,
                email: updatedUser.email,
                medicalHistory: updatedUser.medicalHistory,
                program: updatedUser.program,
                token: generateToken(updatedUser._id)
        })
    }
    }else{
        res.status(404).json({message: "User not found"});
    }
});
*/
//desc     update activity been completed in program
//@route    PUT /api/program/update-activity/:id
//@access   Private
const updateActivity = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if(user){
        //check if user has a active program
        if(!user.program){
            res.status(400).json({message: "User does not have an active program"});
        }else{
            const program = await Program.findById(user.program);
            if(program){
                const activity = program.activities.find(activity => activity._id == req.body.activityId);
                //check if activity been already completed
                if(activity){
                    if(activity.completed){
                        res.status(400).json({message: "Activity already completed"});
                    }else{
                        activity.completed = true;
                        const updatedProgram = await program.save();
                        res.json(updatedProgram);
                }}else{
                    res.status(404).json({message: "Activity not found"});
                }
        }}
    }else{
        res.status(404).json({message: "User not found"});
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
//@route    POST /api/program/add-review/:id
//@access   Private
const addReview = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if(user){
        //check if user has a active program
        if(!user.program){
            res.status(400).json({message: "User does not have an active program"});
        }else{
            const program = await Program.findById(user.program);
            if(program){
                const review = {
                    name: user.name,
                    rating: Number(req.body.rating),
                    comment: req.body.comment
                };
                program.reviews.push(review);
                program.numReviews = program.reviews.length;
                program.rating = program.reviews.reduce((acc, item) => item.rating + acc, 0) / program.reviews.length;
                const updatedProgram = await program.save();
                res.status(201).json(updatedProgram);
            }else{
                res.status(404).json({message: "Program not found"});
            }
        }
    }else{
        res.status(404).json({message: "User not found"});
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

module.exports = {createProgram, getAllPrograms, getProgramById, updateActivity, getSpecialistPrograms, addReview, getProgramUrl};