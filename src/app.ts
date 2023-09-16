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
const GithubStrategy = require('passport-github2').Strategy;
const multer = require('multer');

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
      async (accessToken: any, refreshToken: any, profile: any, done: (arg0: null, arg1: any) => any) => {
        // The profile object contains user information from Google
        // You can save this data to your database or perform other actions here
       
        const { id } = profile
        const username = profile.emails[0].value;
        const provider = 'google'
        const img = profile.photos[0].value 
        const result = await db.query('SELECT * FROM Social_Users WHERE username=$1', 
        [username]);
        const firstname = profile.name.givenName
        const lastname = profile.name.familyName
        
        if(result.rows.length === 0){
          const insert = await db.query('INSERT INTO Social_Users(username, id, provider, picture, firstname, lastname) VALUES($1, $2, $3, $4, $5, $6)', 
          [username, id, provider, img, firstname, lastname])
        }else{
          app.get('/user/data', (req:Request, res:Response) =>  {
            res.json(result.rows[0])
          })
        }
        
        return done(null, profile);
      }
    )
  );

  passport.use(
    new GithubStrategy({
      clientID: process.env.GITHUB_CLIENT,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: 'http://localhost:3000/auth/github/callback'
    }, 
    
    async function(accessToken:any, refreshToken:any, profile: any, done: (arg0:null, arg1: any ) => any){
      
      const { id, username, provider } = profile
      const picture = profile.photos[0].value
     
      const result = await db.query('SELECT * FROM Social_Users WHERE username=$1', 
      [username]);
      

      if(result.rows.length === 0){
        const insert = await db.query('INSERT INTO Social_Users(username, id, provider, picture) VALUES($1, $2, $3, $4)', 
        [username, id, provider, picture])
      }else{
        app.get('/data', (req:Request, res:Response) =>  {
          res.json(result.rows[0])
        })
      }


      return done(null, profile)
    }
    
    )
  )

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/callback', passport.authenticate('google', { failureRedirect: '/' }), (req:Request, res:Response) => {
  // Successful authentication, redirect or respond as needed
  res.redirect('/dashboard');
});

app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }), (req:Request, res:Response) => {
    res.redirect('/dashboard')
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
    res.sendFile(path.join(__dirname, '..', 'public', 'views', 'dashboard.html'))
});


app.get('/home', (req:Request, res:Response) => {
  res.redirect('/')
})


app.post('/sign', async (req:Request, res:Response) => {

    const { email, password } = req.body;

    const result = await db.query('SELECT userid FROM Users WHERE email=$1', 
    [email])

    if(result.rows.length===0){
      const insert = await db.query('INSERT INTO Users(email, password) VALUES($1, $2)', 
      [email, password])
      res.redirect('/dashboard')
      return
    }else{
      res.redirect('/');
      return;
    }

});

app.get('/:username', (req:Request, res:Response) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'views', 'user.html'))
});

app.get('/dashboard/setting', (req:Request, res:Response) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'views', 'setting.html'))
});

app.post('/profile', (req:Request, res:Response) => {
   
})

app.get('/user/logout', (req:Request, res:Response) => {
   req.logOut
   res.redirect('/')
});















































app.listen(port, () => {
    console.log('Server started on port ' + port)
});