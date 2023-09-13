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


app.post("/login", passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/fail'
}));
  
  

app.get('/fail', (req:Request, res:Response) => {
    
    if(req.isAuthenticated()){
        return res.send('The request is ok')
    }else{
        res.send('There is a failure please!');
        return
    }
    
});



app.listen(port, () => {
    console.log('Server started on port ' + port)
});