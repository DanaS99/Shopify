const express = require('express');
const router = express.Router();
const passport = require('passport');

// Google authentication routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', {
  successRedirect: 'http://localhost:3000',
  failureRedirect: 'http://localhost:3000/login'
}));

router.get('/login/success', async (req, res) => {
  if (req.user) {
    res.status(200).json({ message: 'User Login', user: req.user });
  } else {
    res.status(400).json({ message: 'Not Authorized' });
  }
});

router.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) {
      return next(err);
    }
    res.redirect('http://localhost:3000');
  });
});

module.exports = router;
