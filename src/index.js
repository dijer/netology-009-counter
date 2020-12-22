const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const PORT = 3001;
const app = express();

app.use(bodyParser.json());
app.use(cors());


let data = {};

const filepath = path.join(__dirname, 'data.json');
fs.readFile(filepath, 'utf-8', (err, data) => {
    if (err) throw new Error(err);
    const counter = JSON.parse(data);
    data = counter;
});

app.post('/counter/:bookId/incr', async (req, res) => {
    const { bookId } = req.params;
    if (!data[bookId]) {
        data[bookId] = 0;
    }
    data[bookId] += 1;
    await fs.writeFile(filepath, JSON.stringify(data), (err) => {
        if (err) throw new Error(err);
    });
    res.status(200).json(data[bookId]);
});

app.get('/counter/:bookId', (req, res) => {
    const { bookId } = req.params;
    if (data[bookId]) {
        res.json(data[bookId]);
    } else {
        res.status(500).json('Error');
    }
    
});

app.listen(PORT);