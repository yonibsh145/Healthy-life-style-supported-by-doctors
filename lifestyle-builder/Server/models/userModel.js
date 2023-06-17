const { Schema, model } = require("mongoose");
const bcrypt = require('bcryptjs');

const messageSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: "specialists",
    required: true,
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const userSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  medicalHistory: {
    type: String,
    required: false,
  },
  height: {
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
  programs: [{
    type: Schema.Types.ObjectId,
    ref: 'Program',
  }],
  messages: [messageSchema],
  numOfMessages: {
    type: Number,
    required: true,
    default: 0,
  },
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

const UserModel = model("users", userSchema);
module.exports = UserModel;