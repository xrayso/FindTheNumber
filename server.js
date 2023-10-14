const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const SQRT_MAX = 32767;
const MAX = SQRT_MAX * SQRT_MAX;

const probabilityDistribution = [];

for (let i = 0; i <= MAX; i++){
    probabilityDistribution.push(0);
}
for (let i = 0; i <= SQRT_MAX; i++){
    for (let j = 0; j <= SQRT_MAX; j++){
        probabilityDistribution[i*j]++;
    }
}
// Parse JSON and url-encoded body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Handle POST requests to the /calculate endpoint
app.post('/calculate', (req, res) => {
    // Check if the 'number' parameter exists in the request body
    if (req.body.number === undefined) {
        return res.status(400).json({ error: 'Number parameter is missing' });
    }

    // Parse the number from the request body
    const inputNumber = parseFloat(req.body.number);

    // Check if the number is valid
    if (isNaN(inputNumber)) {
        return res.status(400).json({ error: 'Invalid number' });
    }

    // Calculate and send the result (number - 5)
    const result = inputNumber - 5;
    res.json({ result });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
