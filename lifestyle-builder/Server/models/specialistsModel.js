const { Schema, model } = require("mongoose");
const bcrypt = require('bcryptjs');
const specialistSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required:true,
    },
    password: {
        type: String,
        required:true,
    },
    email: {
        type: String,
        required:true,
    },
    // i want to that speicailt is a user but his role is speicailst not patient
    role: {
        type: String,
        required: true,
        default: "specialist",
    }
   
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

const specialisttModel = model("specialists",specialistSchema);
module.exports = specialisttModel;