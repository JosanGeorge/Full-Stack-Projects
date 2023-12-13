const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Connect to MongoDB (Make sure your MongoDB server is running)
mongoose.connect('mongodb://localhost:27017/habitTrackingApp', { useNewUrlParser: true, useUnifiedTopology: true });

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Define Habit model
const Habit = mongoose.model('Habit', {
    name: String,
    progress: { type: Number, default: 0 },
    goal: Number,
});

// Routes
app.get('/', async (req, res) => {
    try {
        const habits = await Habit.find();
        res.render('index', { habits });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/add', async (req, res) => {
    try {
        const { name, goal } = req.body;
        const habit = new Habit({ name, goal });
        await habit.save();
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/update/:id', async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id);
        habit.progress += 1;
        await habit.save();
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
