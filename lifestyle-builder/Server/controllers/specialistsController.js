const Specialist = require('../models/specialistsModel');
const Program = require('../models/programModel');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');
//@desc     register a new specialist
//@route    POST /api/specialists/register
//@access  Public
const registerSpecialist = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(400).json({message: "Please fill all fields"});
    }
    const userExist = await Specialist.findOne({email}).lean().exec();
    if(userExist){
        res.status(409).json({message: "User already exist"});
    }
    //create user object and save to db
    const specailist = await Specialist.create({ username, email, password});
    if(specailist){
        res.status(200).
        json({message: "Specialist created successfully",
        _id: specailist._id,
        username: specailist.username,
        email: specailist.email,
        role: specailist.role,
        token: generateToken(specailist._id),
    });
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


//@desc     Specialist updates user's program and removes request
//@route    PUT /api/specialists/acceptrequest
//@access   Private

const acceptRequest = asyncHandler(async (req, res) => {
    const { userId, programId } = req.body;
  
    try {
      // Find the specialist based on the logged-in user
      const specialist = await Specialist.findById(req.user._id);
  
      // Find the user and program
      const user = await User.findById(userId);
      const program = await Program.findById(programId);
  
      if (!specialist || !user || !program) {
        res.status(404).json({ message: 'Specialist, user, or program not found' });
        return;
      }
  
      // Update the user's program and programStatus
      const programIndex = user.programs.findIndex(prog => prog.toString() === programId);
      if (programIndex !== -1) {
        user.programStatus[programId] = 'Accepted';
      }
      await user.save();
  
      // Remove the request from the specialist's requests array
      const requestIndex = specialist.requests.findIndex(
        (request) => request.user.toString() === userId && request.program.toString() === programId
      );
      if (requestIndex !== -1) {
        specialist.requests.splice(requestIndex, 1);
      }
  
      // Add the user to the specialist's patients array
      specialist.patients.push(userId);
      await specialist.save();
  
      res.status(200).json({ message: 'User program updated, request removed, and user added to specialist\'s patients' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
//desc     specialist send message to user
//@route    POST /api/specialists/sendmessage
//@access   Private
const sendMessage = asyncHandler(async (req, res) => {
    const { userId, message } = req.body;
  
    // Retrieve the specialist and user based on their IDs
    const specialist = await Specialist.findById(req.specialist._id);
    const user = await User.findById(userId);
  
    if (!specialist || !user) {
      res.status(404).json({ message: 'Specialist or user not found' });
      return;
    }
  
    // Create a new message
    const newMessage = new Message({
      sender: specialist._id,
      recipient: user._id,
      message: message
    });
  
    // Save the message
    await newMessage.save();
  
    // Update the user's messages
    user.messages.push(newMessage);
    await user.save();
  
    res.status(200).json({ message: 'Message sent to the user' });
  });
  


module.exports = {registerSpecialist, authSpecialist, getSpecialistProfile, updateSpecialistProfile,acceptRequest};

