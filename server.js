const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const console = require('console');

app.use(cors());
app.use(express.json());

//connect to mongoose
mongoose.connect('mongodb+srv://Dom:RjIbzYxjHaL8ypxa@cluster0.fpxgk.mongodb.net/Test')

//require route
app.use("/", require("./routes/noteRoute"));

app.listen(3001, function(){
    console.log("express server is running on port 3001");
})