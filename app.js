const express = require('express');
const path = require('path');
const gondolaParts = require('./gondola-parts');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

// Main route for the app
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'));
});

// Route to calculate gondola parts based on length
app.post('/calculate-parts', (req, res) => {
    const { totalLength } = req.body;
    const parts = gondolaParts.calculateParts(totalLength);
    res.json(parts);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
