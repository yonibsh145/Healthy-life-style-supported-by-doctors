const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Specialist = require('../models/specialistsModel');
const asyncHandler = require('express-async-handler');

const protect = asyncHandler(async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.ACCESS_JWT_SECRET);
            //dont know if it is a user or a specialist
            //how to cover to user or specialist
            req.user = await User.findById(decoded.id).select('-password');
            next();
        }catch(error){
            console.error(error);
            res.status(401).json({message: "Not authorized, token failed"});
        }
    }
    if(!token){
        res.status(401).json({message: "Not authorized, no token"});
    }
});

const protected = asyncHandler(async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.ACCESS_JWT_SECRET);
            //dont know if it is a user or a specialist
            //how to cover to user or specialist
            req.user = await Specialist.findById(decoded.id).select('-password');
            next();
        }catch(error){
            console.error(error);
            res.status(401).json({message: "Not authorized, token failed"});
        }
    }
    if(!token){
        res.status(401).json({message: "Not authorized, no token"});
    }
});

  
const patient = (req, res, next) => {
    if(req.user && req.user.role === 'patient'){
        next();
    }else{
        res.status(401).json({message: "Not authorized as a patient"});
    }
};

const specialist = (req, res, next) => {
    if(req.user && req.user.role === 'specialist'){
        next();
    }else{
        res.status(401).json({message: "Not authorized as a specialist"});
    }
}

module.exports = {protect,protected, patient, specialist};

    