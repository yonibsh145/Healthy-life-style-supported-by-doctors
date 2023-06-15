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


///@desc     Specialist updates user's program and removes request if accepted
//@route    PUT /api/specialists/updaterequest
//@access   Private

const updateRequest = asyncHandler(async (req, res) => {
  const { userId, programId, action } = req.body;

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
      if (action === 'accept') {
        user.programStatus[programId] = 'Accepted';

        // Set the start date to the current date
        user.programs[programIndex].startDate = new Date();
        await user.save();
      } else if (action === 'reject') {
        user.programStatus[programId] = 'Rejected';
        await user.save();
      }
    } else {
      res.status(404).json({ message: 'Program not found in user\'s programs' });
      return;
    }

    // Remove the request from the specialist's requests array
    const requestIndex = specialist.requests.findIndex(
      (request) => request.user.toString() === userId && request.program.toString() === programId
    );
    if (requestIndex !== -1) {
      specialist.requests.splice(requestIndex, 1);
    }

    // Add the user to the specialist's patients array if the request was accepted
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
  try {
    // Find the specialist
    const specialist = await SpecialistModel.findById(req.user._id);
    // Check if the specialist exists
    if (!specialist) {
      return res.status(404).json({ message: 'Specialist not found' });
    }
    // Get the specialist's patients
    const patients = await UserModel.find({ _id: { $in: specialist.patients } });
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
    const specialist = await Specialist.findById(req.specialist._id).populate('requests.user', 'name');
    
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

//desc get programs that specialist has created
//@route GET /api/specialists/programs
//@access Private
const getSpecialistPrograms = asyncHandler(async (req, res) => {
  try {
    // Find the specialist based on the logged-in user
    const specialist = await Specialist.findById(req.user._id).populate('programs');

    if (!specialist) {
      res.status(404).json({ message: 'Specialist not found' });
      return;
    }

    res.status(200).json({ programs: specialist.programs });
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

