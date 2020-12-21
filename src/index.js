const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = 3001;
const app = express();

app.use(bodyParser.json());
app.use(cors());

let data = {};
app.post('/counter/:bookId/incr', (req, res) => {
    const { bookId } = req.params;
    if (!data[bookId]) {
        data[bookId] = 0;
    }
    data[bookId] += 1;
    res.status(200).json('ok');
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