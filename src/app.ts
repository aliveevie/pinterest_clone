import { error } from "console";
import { NextFunction, Request, Response, urlencoded } from "express";
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const db = require('./db/db');
const passport = require('passport');
import { Strategy as LocalStrategy } from 'passport-local'
const session = require('express-session');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

app.use(
    session({
      secret: 'abc',
      resave: false,
      saveUninitialized: false,
      // Additional session options as needed
    })
  );

app.use(passport.session());
app.use(passport.initialize());


passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      (email, password, done) => {
        // Query your PostgreSQL database to find the user
        db.query('SELECT userid FROM Users WHERE email = $1 AND password = $2', [email, password])
          .then((result: any) => {
            const user = result.rows[0];
            if (!user) {
              return done(null, false, { message: 'Incorrect username or password.' });
            }
            return done(null, user); // Serialize the user by storing their ID
          })
          .catch((err: Error) => done(err));
      }
    )
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/auth/callback', // Update with your redirect URI
        scope: [ 'profile' ]
      },
      (accessToken: any, refreshToken: any, profile: any, done: (arg0: null, arg1: any) => any) => {
        // The profile object contains user information from Google
        // You can save this data to your database or perform other actions here
        console.log(profile);
        return done(null, profile);
      }
    )
  );

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/callback', passport.authenticate('google', { failureRedirect: '/' }), (req:Request, res:Response) => {
  // Successful authentication, redirect or respond as needed
  res.redirect('/dashboard');
});
  


  
  passport.serializeUser(function(user:any, done:any) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user:any, done:any) {
    done(null, user);
  });
  


app.use(express.static('public'))
app.use(urlencoded({ extended: true}));

app.get('/', (req:Request, res:Response) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.post("/login", (req:Request, res:Response, next:NextFunction) => {
    passport.authenticate('local', (err:Error, user:any, info:any) => {
      if(err){
        return next(err)
      }

      if(!user){
        res.redirect('/home')
        return
      }

      req.logIn(user, (err) => {
        if(err){
          return next(err);
        }
        return res.redirect('/dashboard')
      });
    })(req, res, next)
});
  
  

app.get('/dashboard', (req:Request, res:Response) => {
    res.send('Welcome To Dashboad Stay sign in!')
});


app.get('/home', (req:Request, res:Response) => {
  res.redirect('/')
})



app.listen(port, () => {
    console.log('Server started on port ' + port)
});