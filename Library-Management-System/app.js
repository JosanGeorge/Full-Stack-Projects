const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Connect to MongoDB (Make sure your MongoDB server is running)
mongoose.connect('mongodb://localhost:27017/libraryManagementSystem', { useNewUrlParser: true, useUnifiedTopology: true });

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Define Book model
const Book = mongoose.model('Book', {
    title: String,
    author: String,
    ISBN: String,
    available: Boolean,
});

// Routes
app.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.render('index', { books });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/add', (req, res) => {
    res.render('add');
});

app.post('/add', async (req, res) => {
    try {
        const { title, author, ISBN } = req.body;
        const book = new Book({ title, author, ISBN, available: true });
        await book.save();
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/borrow/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book.available) {
            book.available = false;
            await book.save();
        }
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/return/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book.available) {
            book.available = true;
            await book.save();
        }
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
