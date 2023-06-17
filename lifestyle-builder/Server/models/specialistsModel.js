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

const specialistSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "specialist",
  },
  outgoingMessages: [messageSchema], // Messages sent by the specialist
  incomingMessages: [messageSchema], // Messages received by the specialist
  patients: [
    {
      patient: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
      patientName: {
        type: String,
        required: true,
      },
    },
  ],
  programs: [
    {
      program: {
        type: Schema.Types.ObjectId,
        ref: "programs",
        required: false,
      },
      programName: {
        type: String,
        required: false,
      },
      programStartDate: {
        type: Date,
        required: false,
      },
    },
  ],
    rating: {
    type: Number,
    required: false,
    default: 0,
  },
  requests: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: false,
      },
      userUsername: {
        type: String,
        required: false,
      },
      program: {
        type: Schema.Types.ObjectId,
        ref: "programs",
        required: false,
      },
      programName: {
        type: String,
        required: false,
    },
  },
  ],
}, {
  timestamps: true,
});

specialistSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

specialistSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const specialistModel = model("specialists", specialistSchema);
module.exports = specialistModel;