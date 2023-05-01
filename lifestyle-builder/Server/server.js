require ("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3001;
//const mongoose = require("mongoose");
//const UserModel = require("./models/userModel");

/*
const uri= process.env.ATLAS_URI  || "mongodb://localhost:27017/lifestyle-builder";
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})




app.get("/getUsers", async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.json(users);
  } catch (err) {
    res.json(err);
  }
});*/
console.log("NODE_ENV: ", process.env.NODE_ENV);      
app.use(express.json());

app.use("/",express.static(path.join(__dirname, "../public")));
 
app.listen(3001,() => {
    console.log(`Server is running on port: ${port}`);
});
