const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    googleId: {
        type: String,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: { 
        type: String,
        required: function() {
          return !this.googleId; // Only required if the user didn't sign up with Google
        }
      },
    
    image: {
        type: String,
    }
});

userdb = mongoose.model('user', UserSchema);
module.exports = userdb;