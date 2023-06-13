require ("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const connectDB = require("./Config/dbConnection");
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT || 3001;
const userRoutes = require("./routes/userRoutes");
const specialistRoutes = require("./routes/specialistsRoutes");
const programRoutes = require("./routes/programRoutes");
const ProgramModel = require("./models/programModel");





connectDB();
console.log("NODE_ENV: ", process.env.NODE_ENV);      
app.use(express.json());

app.use("/",express.static(path.join(__dirname, "../public")));

app.use(cors({
    origin: 'http://localhost:5173', // Replace with the appropriate origin URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the allowed HTTP methods
    allowedHeaders: ['Content-Type'], // Specify the allowed request headers
  }));

app.use("/api/users", userRoutes);
app.use("/api/specialists", specialistRoutes);
app.use("/api/programs", programRoutes);
app.use(cors());


mongoose.connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
    app.listen(3001,() => {
        console.log(`Server is running on port: ${port}`);
    });
});




