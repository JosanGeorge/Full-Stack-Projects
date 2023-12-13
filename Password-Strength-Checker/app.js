const express = require('express');
const bodyParser = require('body-parser');
const zxcvbn = require('zxcvbn');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/check-password', (req, res) => {
    const password = req.body.password;
    const result = zxcvbn(password);

    res.json({
        score: result.score,
        feedback: result.feedback.suggestions,
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
