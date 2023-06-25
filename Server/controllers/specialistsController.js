const Specialist = require('../models/specialistsModel');
const Program = require('../models/programModel');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');
const { request } = require('express');
//@desc     register a new specialist
//@route    POST /api/specialists/register
//@access  Public
const registerSpecialist = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400).json({ message: "Please fill all fields" });
  }
  const userExist = await Specialist.findOne({ email }).lean().exec();
  if (userExist) {
    res.status(409).json({ message: "User already exist" });
  }
  //create user object and save to db
  const specailist = await Specialist.create({ username, email, password });
  if (specailist) {
    res.status(200).
      json({
        message: "Specialist created successfully",
        _id: specailist._id,
        username: specailist.username,
        email: specailist.email,
        role: specailist.role,
        token: generateToken(specailist._id),
      });
  } else {
    res.status(400).json({ message: "Invalid Specialist data" });
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
      username: specialist.username,
      email: specialist.email,
      role: specialist.role,
      bio: specialist.bio,
      tags: specialist.tags,
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
  const specialistId = req.query.specialistId;
  console.log(specialistId);
  const specialist = await Specialist.findById(specialistId);
  if (specialist) {
    res.json({
      _id: specialist._id,
      name: specialist.username,
      email: specialist.email,
      role: specialist.role,
      tags: specialist.tags,
      bio: specialist.bio,
    });
  } else {
    res.status(404);
    throw new Error('Specialist not found');
  }
});

//@desc   update specialist profile
//@route  PUT /api/specialists/profile
//@access Private
const updateSpecialistProfile = asyncHandler(async (req, res) => {
  //const specialistId = req.body.specialistId;
  const specialist = await Specialist.findById(req.body._id);
  if (specialist) {
    specialist.name = req.body.name || specialist.name;
    specialist.email = req.body.email || specialist.email;
    specialist.bio = req.body.bio || specialist.bio;
    specialist.tags = req.body.tags || specialist.tags;
    if (req.body.password) {
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
  } else {
    res.status(404);
    throw new Error('Specialist not found');
  }
});


///@desc     Specialist updates user's program and removes request if accepted
//@route    PUT /api/specialists/updaterequest
//@access   Private

const updateRequest = asyncHandler(async (req, res) => {
  const { specialistId, userId, programId, action } = req.body;
  try {
    const specialist = await Specialist.findById(specialistId);
    const user = await User.findById(userId).populate('programs');

    if (!specialist || !user) {
      res.status(404).json({ message: 'Specialist, user, or program not found' });
      return;
    }

    const requestIndex = specialist.requests.findIndex(request => request.user.toString() === userId && request.program.toString() === programId);

    if (requestIndex === -1) {
      res.status(404).json({ message: 'Request not found' });
      return;
    }

    const programIndex = user.programs.findIndex(program => program.program._id.toString() === programId);

    if (programIndex === -1) {
      res.status(404).json({ message: 'Program not found in user\'s programs' });
      return;
    }

    const programStatus = user.programs[programIndex].programStatus;

    if (programStatus !== 'Pending') {
      res.status(400).json({ message: 'Program status is not Pending' });
      return;
    }

    if (action === 'accept') {
      user.programs[programIndex].programStatus = 'Active';
      user.programs[programIndex].startDate = new Date();
      await user.save();
    } else if (action === 'reject') {
      user.programs[programIndex].programStatus = 'Rejected';
      await user.save();
    }

    specialist.requests.splice(requestIndex, 1);

    if (action === 'accept') {
      specialist.patients.push(userId);
      await specialist.save();
    }

    res.status(200).json({ message: `User program ${action === 'accept' ? 'accepted' : 'rejected'}, request removed, and user ${action === 'accept' ? 'added to' : 'not added to'} specialist\'s patients` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


//desc     specialist send message to user
//@route    POST /api/specialists/sendmessage
//@access   Private

const sendMessage = async (req, res) => {
  const { senderId, receiverId, message } = req.body;

  // Check if the sender is a specialist
  if (req.user.role !== 'specialist') {
    return res.status(400).json({ message: 'Invalid sender role' });
  }

  try {
    // Find the sender and receiver
    const sender = await SpecialistModel.findById(senderId);
    const receiver = await UserModel.findById(receiverId);

    // Check if sender and receiver exist and if the receiver is in the sender's patients array
    if (!sender || !receiver || !sender.patients.includes(receiverId)) {
      return res.status(404).json({ message: 'Sender or receiver not found' });
    }

    // Create a new message
    const newMessage = {
      sender: sender._id,
      receiver: receiver._id,
      senderRole: 'specialist',
      receiverRole: 'user',
      message,
    };

    // Add the message to the sender's messages array
    sender.messages.push(newMessage);

    // Save the changes
    await sender.save();

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
//desc   get messages
//@route  GET /api/specialists/messages
//@access Private
const getMessages = asyncHandler(async (req, res) => {
  const specialistId = req.specialist._id;

  try {
    // Find the specialist by their ID
    const specialist = await SpecialistModel.findById(specialistId).populate("incomingMessages sender", "-password");

    if (!specialist) {
      return res.status(404).json({ message: "Specialist not found" });
    }

    // Get the specialist's incoming messages
    const messages = specialist.incomingMessages;

    res.status(200).json({ messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});



//desc     get all specialist patients
//@route    GET /api/specialists/patients
//@access   Private
const getSpecialistPatients = async (req, res) => {
  const {specialistId} = req.query;
  try {
    // Find the specialist
    const specialist = await Specialist.findById(specialistId).populate('patients');
    // Check if the specialist exists
    if (!specialist) {
      return res.status(404).json({ message: 'Specialist not found' });
    }
    // Get the specialist's patients
    const patients = specialist.patients;
    res.status(200).json(patients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

//desc   get all specialist requests
//@route  GET /api/specialists/requests
//@access Private
const getSpecialistRequests = asyncHandler(async (req, res) => {
  try {
    const { specialistId } = req.query;
    const specialist = await Specialist.findById(specialistId).populate({
      path: 'requests.user',
      select: 'username email _id', // Populate 'name' and 'email' fields of the user document
    }).populate({
      path: 'requests.program',
      select: 'name description _id', // Populate 'name' and 'description' fields of the program document
    });

    if (!specialist) {
      return res.status(404).json({ message: 'Specialist not found' });
    }

    const requests = specialist.requests;

    res.status(200).json({ requests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});



//@desc   Get all programs of a specialist
//@route  GET /api/specialists/programs
//@access Public
const getSpecialistPrograms = asyncHandler(async (req, res) => {
  const {specialistId} = req.query; // Use req.query to access the query parameters
  try {
    const specialist = await Specialist.findById(specialistId).populate('programs')

    if (!specialist) {
      return res.status(404).json({ message: 'Specialist not found' });
    }

    const programs = specialist.programs;

    res.status(200).json({ programs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});



module.exports = {
  registerSpecialist,
  authSpecialist,
  getSpecialistProfile,
  updateSpecialistProfile,
  updateRequest,
  sendMessage,
  getSpecialistPatients,
  getSpecialistRequests,
  getMessages,
  getSpecialistPrograms,

};

