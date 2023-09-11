"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
const port = 3000;
app.get('/', (req, res) => {
    res.send('Hello Pinterest');
});
app.listen(port, () => {
    console.log('Server started on port ' + port);
});
