//Dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');



// express and server set up
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended:true }));
app.use(express.json());

//Variables
const notesDB = fs.readFileSync("./db/db.json", "utf-8");
const notes = JSON.parse(notesDB);
const jsonNotes = path.join(__dirname, './db/db.json');



//Routes
// --> GET requests
app.get('/assets/js/index.js', (req, res) => {
    res.set('Content-Type', 'text/js');
    res.sendFile(path.join(__dirname, './public/assets/js/index.js'));
});


app.get('/assets/css/styles.css', (req, res) => {
    res.set('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, './public/assets/css/styles.css'));
});

// app.get('*', (req, res) => {res.sendFile(path.join(__dirname, './public/index.hmtl'))});
app.get('/notes', (req, res) => {res.sendFile(path.join(__dirname, './public/notes.html'))});
app.get('/', (req, res) => {res.sendFile(path.join(__dirname, './public/index.html'))});
app.get('/api/notes', (req, res) => {res.sendFile(path.join(__dirname, './db/db.json'))});


// --> POST requests
app.post('/api/notes', (req, res) => {
    let note = req.body;

    //write new note to notes, then send notes to database in json formate
    let notedID = uuidv4();
    note.id = notedID;
    notes.push(note);

    fs.writeFile(
        jsonNotes,
        JSON.stringify(notes),
        (err) => (err ? console.log(err) : console.log('Notes saved.'))
    );

    res.send(note);
});

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));