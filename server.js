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
const notes = JSON.parse(data);
const jsonNotes = path.join(__dirname, './db/db.json');


//Routes
app.get('/api/notes', (req, res) => {res.sendFile(path.join(__dirname, './db/db.json'))})

app.post('/api/notes/:id', (req, res) => {
    let note = req.body;

    //write new note to notes, then send notes to database in json formate
    let newID = uuidv4();
    note.id(newID);
    notes.push(note);

    fs.writeFile(
        jsonNotes,
        JSON.stringify(notes),
        (err) => (err ? console.log(err) : console.log('Notes saved.'))
    );

    res.send(note);
})