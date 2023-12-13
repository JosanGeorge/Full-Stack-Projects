const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost/file_sharing_system', { useNewUrlParser: true, useUnifiedTopology: true });

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

const fileSchema = new mongoose.Schema({
    filename: String,
    path: String,
});

const File = mongoose.model('File', fileSchema);

app.get('/', async (req, res) => {
    const files = await File.find();
    res.render('index', { files });
});

app.post('/upload', upload.single('file'), async (req, res) => {
    const file = new File({
        filename: req.file.originalname,
        path: req.file.path,
    });

    await file.save();
    res.redirect('/');
});

app.get('/download/:id', async (req, res) => {
    const file = await File.findById(req.params.id);

    if (file) {
        res.download(path.join(__dirname, file.path), file.filename);
    } else {
        res.status(404).send('File not found');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
