const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { PORT, mongoDBURL } = require('./config.js'); // Replace './config.js'
const todoRoute = require('./routes/todoRoute.js');
const searchRoute = require('./routes/searchRoute.js');
const userRoute = require('./routes/userRoute.js');
const inviteRoute = require('./routes/inviteRoute.js');

const app = express();

app.use(express.json());

// CORS middleware
app.use(
  cors({
    origin: "http://localhost:5000",
    methods: ["POST", "GET", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// Todo route
app.use('/todo', todoRoute);
//search route
app.use('/search', searchRoute);
//user route
app.use('/user', userRoute);
//invite route
// app.use('/invite', inviteRoute);

// Connect to MongoDB database
mongoose
  .connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Successfully connected to Database");

    // Start the server after successful database connection
    app.listen(PORT, () => { // Use PORT from your configuration
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to Database:", error);
  });

// Your routes and other middleware should be defined after this point
