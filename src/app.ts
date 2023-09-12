import { Request, Response, urlencoded } from "express";
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.use(express.static('public'))
app.use(urlencoded({ extended: true}));

app.get('/', (req:Request, res:Response) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.post('/login', (req:Request, res:Response) => {
    console.log(req.body)
    
});

app.listen(port, () => {
    console.log('Server started on port ' + port)
});