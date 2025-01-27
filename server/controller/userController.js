const axios = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserSchema = require('../model/UserSchema');

const mongoose = require('mongoose');

// Backend
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await UserSchema.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: 'User already exists, please log in',
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserSchema({ name, email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({
      message: 'Signup successful',
      success: true,
    });
  } catch (error) {
    console.error('Error during signup:', error);
    return res.status(500).json({
      message: 'Internal Server Error',
      success: false,
    });
  }
};


exports.login = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const users = await UserSchema.findOne({ email });
    if (!users) {
      return res
        .status(403)
        .json({
          message: 'Auth is wrong, email or password are wrong',
          success: false,
        });
    }

    console.log(users);
    const isPassEqual = await bcrypt.compare(password, users.password);

    if (!isPassEqual) {
      return res
        .status(403)
        .json({
          message: 'Auth is wrong, email or password are wrong',
          success: false,
        });
    }

    const jwtToken = jwt.sign(
      { name: users.name, email: users.email, _id: users._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );


    res.status(200).json({
      message: 'Login successfully',
      success: true,
      jwtToken,
      email,
      name: users.name,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Internal Server error',
      success: false,
    });
  }
};
