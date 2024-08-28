const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const itemRoutes = require('./route/itemRoutes');
const userRoutes = require('./route/userRoutes');
const userdb = require("./model/UserSchema");
require('./db'); // Ensure your DB connection is established
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;

app.use(bodyParser.json());

// Use CORS to allow requests from your frontend
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  methods: "GET, POST, PUT, DELETE",
  credentials: true,
}));


app.use(session({
  secret: "157788asadsd",
  resave: false,
  saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new OAuth2Strategy({
    clientID: process.env.client_id ,
    clientSecret: process.env.client_secret,
    callbackURL: "/auth/google/callback",
    scope: ["profile", "email"]
  },
  async(accessToken, refreshToken,profile,done)=>{
  //  console.log("profile:", profile);
    try {
      let user = await userdb.findOne({googleId: profile.id})
      if (!user) {
        user = new userdb({
          googleId: profile.id,
          name: `${profile.name.givenName} ${profile.name.familyName}`, 
          email: profile.emails[0].value,
          image: profile.photos[0].value,
          
        })
        await user.save()
      }
      return done(null, user)
    } catch (error) {
      return done(error, null)
    }
  })
)

passport.serializeUser((user,done) => {
  done(null, user)
})

passport.deserializeUser((user,done) => {
  done(null, user)
})

app.use('/api', itemRoutes);
app.use('/auth', userRoutes);

// app.get('/ping', (req, res)=> {
//   res.send("pong");
// })

app.get("/auth/google", passport.authenticate("google", {scope: ["profile", "email"]}))

app.get("/auth/google/callback", passport.authenticate("google", {
  successRedirect: "http://localhost:3000",
  failureRedirect: "http://localhost:3000/login"
}))

app.get("/login/success", async (req, res) => {
  console.log("Success route hit", req.user);

  if (req.user) {
    console.log('Response Data:', { message: "User Login", user: req.user });
    res.status(200).json({ message: "User Login", user: req.user });
  } else {
    res.status(400).json({ message: "Not Authorized" });
  }
});

app.get('/test', (req, res) => res.send('Test route working'));


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
