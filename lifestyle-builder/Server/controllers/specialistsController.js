const Specialist = require('../models/specialistsModel');
const Program = require('../models/programModel');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

//@desc     register a new specialist
//@route    POST /api/specialists/register
//@access  Public
const registerSpecialist = asyncHandler(async (req, res) => {
    const {name, username, email, password} = req.body;
    if(!name || !username || !email || !password){
        res.status(400).json({message: "Please fill all fields"});
    }
    const userExist = await Specialist.findOne({email}).lean().exec();
    if(userExist){
        res.status(409).json({message: "User already exist"});
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //create user object and save to db
    const specailist = await Specialist.create({name, username, email, password: hashedPassword});
    if(specailist){
        res.status(200).json({message: "Specialist created successfully"});
    }else{
        res.status(400).json({message: "Invalid Specialist data"});
    } 
});

//@desc    authenticate specialist and get token
//@route   POST /api/specialists/login
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
//@route  GET /api/specialists/profile
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
//@route  PUT /api/specialists/profile
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
    

module.exports = {registerSpecialist, authSpecialist, getSpecialistProfile, updateSpecialistProfile}


