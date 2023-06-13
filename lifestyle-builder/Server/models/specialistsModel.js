const { Schema, model } = require("mongoose");
const Program = require("./programModel");
const bcrypt = require('bcryptjs');
const messageSchema = new Schema({
    sender: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "specialists",
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
      required: true,
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
    messages: [messageSchema],
    patients: [{ type: Schema.Types.ObjectId, ref: "users" }],
    programs: [{ type: Schema.Types.ObjectId, ref: "programs" }],
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
          required: true,
        },
        program: {
          type: Schema.Types.ObjectId,
          ref: "programs",
          required: true,
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
  