const Specialist = require('../models/specialistsModel');
const Program = require('../models/programModel');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

//@desc     register a new specialist
//@route    POST /api/specialist/register
//@access  Public
const registerSpecialist = asyncHandler(async (req, res) => {
    const {name, username, email, password} = req.body;
    if(!name || !username || !email || !password){
        res.status(400).json({message: "Please fill all fields"});
    }
    const userExist = await User.findOne({email}).lean().exec();
    if(userExist){
        res.status(409).json({message: "User already exist"});
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //create user object and save to db
    const user = await User.create({name, username, email, password: hashedPassword, medicalHistory});
    if(user){
        res.status(201).json({message: "User created successfully"});
    }else{
        res.status(400).json({message: "Invalid user data"});
    } 
});

//@desc    authenticate specialist and get token
//@route   POST /api/specialist/login
//@access  Public
const authSpecialist = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const specialist = await Specialist.findOne({ email });
    if (specialist && (await specialist.matchPassword(password))) {
        res.json({
            _id: specialist._id,
            name: specialist.name,
            email: specialist.email,
            role: specialist.role,
            token: generateToken(specialist._id),
        });
        }
        else {
            res.status(401);
            throw new Error('Invalid email or password');
        }
    });

//@desc   get specialist profile
//@route  GET /api/specialist/profile
//@access Private
const getSpecialistProfile = asyncHandler(async (req, res) => {
    const specialist = await Specialist.findById(req.specialist._id);
    if(specialist){
        res.json({
            _id: specialist._id,
            name: specialist.name,
            email: specialist.email,
            role: specialist.role,
        });
    }else{
        res.status(404);
        throw new Error('Specialist not found');
    }
});

//@desc   update specialist profile
//@route  PUT /api/specialist/profile
//@access Private
const updateSpecialistProfile = asyncHandler(async (req, res) => {
    const specialist = await Specialist.findById(req.specialist._id);
    if(specialist){
        specialist.name = req.body.name || specialist.name;
        specialist.email = req.body.email || specialist.email;
        if(req.body.password){
            specialist.password = req.body.password;
        }
        const updatedSpecialist = await specialist.save();
        res.json({
            _id: updatedSpecialist._id,
            name: updatedSpecialist.name,
            email: updatedSpecialist.email,
            role: updatedSpecialist.role,
            token: generateToken(updatedSpecialist._id),
        });
    }else{
        res.status(404);
        throw new Error('Specialist not found');
    }
});
    

module.exports = {registerSpecialist, authSpecialist, getSpecialistProfile, updateSpecialistProfile};


