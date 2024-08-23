const axios = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserSchema = require('../model/UserSchema');

const mongoose = require('mongoose');

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const users = await UserSchema.findOne({ email });
    if (users) {
      return res
        .status(409)
        .json({
          message: 'User is already found, you can login',
          success: false,
        });
    }

    const userModel = new UserSchema({ name, email, password });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    res.status(201).json({
      message: 'Signup successfully',
      success: true,
    });
  } catch (e) {
    res.status(201).json({
      message: 'Internal Server error',
      success: false,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await UserSchema.findOne({ email });
    if (!users) {
      return res
        .status(403)
        .json({
          message: 'Auth is wrong, email or password are wrong',
          success: false,
        });
    }

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
      { email: users.email, _id: users._id },
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
