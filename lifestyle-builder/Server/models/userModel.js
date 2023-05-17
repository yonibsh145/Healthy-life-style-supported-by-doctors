const { Schema, model } = require("mongoose");
const bcrypt = require('bcryptjs');
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required:true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required:true,
    },
    medicalHistory: {
        type: String,
        required: false,
    },
    hegiht: {
        type: Number,
        required: false,
    },
    weight: {
        type: Number,
        required: false,
    },
    role: {
        type: String,
        required: true,
        default: "patient",
    },
    program:{
        type: Schema.Types.ObjectId,
        ref: "programs",
        required:false,
    },
    programStatus:{
        type: String,
        required: false,
    }
});
    
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
  
const UserModel = model("users",userSchema);
module.exports = UserModel;