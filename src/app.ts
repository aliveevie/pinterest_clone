import { NextFunction, Request, Response, urlencoded } from "express";
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const db = require('./db/db');
const passport = require('passport')
const LocalStrtegy = require('passport-local').Strategy;

passport.use(
    new LocalStrtegy(async (username: any, password: any, done: any) => {
        
        const user = await db.query('SELECT username, password FROM users WHERE username=$1 AND password=$2', 
        [username, password]);

        const name = user.rows[0].username;
        const pin = user.rows[0].password;
        console.log(name, pin);
    })
)


app.use(express.static('public'))
app.use(urlencoded({ extended: true}));

app.get('/', (req:Request, res:Response) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.post(
    '/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    })
)

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if(req.isAuthenticated()){
        return next();
    }
}


app.get('/profile', (req:Request, res:Response) => {
    res.send('Welcome to Profile!')
})

app.listen(port, () => {
    console.log('Server started on port ' + port)
});