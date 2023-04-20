const express = require("express");
const { db } = require("./firebase-config");
const app = express();



app.listen(3001,() => {
    console.log("Server Run Perfectly");
});

