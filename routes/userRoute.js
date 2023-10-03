const express = require('express');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

require('dotenv').config();

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    // Getting user input
    const { first_name, last_name, email, password } = req.body;

    // Check if input fields are empty
    if (!(email && password && first_name && last_name)) {
      return res.status(400).send('All fields are required');
    }

    // Check if the user already exists in the database
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(400).send('User already exists, please login');
    }

    // Password encryption
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    // Create user token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: '2h',
      }
    );

    // Save user token
    user.token = token;

    // Return the new user
    res.status(201).json(user); // Change to 201 for successful resource creation

  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});
module.exports = router;

//user login

router.post('/login', async (req, res) => {
  try{
    //getting user input
    const {email, password} = req.body;
    //input validation
    if (!(email && password)) {
      res.status(400).send('Field required!');
    }
    //validate if user exist
    const user = await User.findOne({email});
    if (user && (await bcrypt.compare(password, user.password))) {
      //create token
      const token = jwt.sign(
        {user_id: user._id, email},
        process.env.TOKEN_KEY,
        {
          expiresIn: "4h",
        }
      );

      //save user token
      user.token = token;
      //user
      return res.status(200).json(user);
    }
    return res.status(400).send("Wrong username or password!");
  }catch(error){
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
})

module.exports = router;
