import { Request, Response } from "express";
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.use(express.static('public'))


app.get('/', (req:Request, res:Response) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log('Server started on port ' + port)
});