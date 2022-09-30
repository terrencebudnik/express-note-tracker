const fb = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');


fb.get('/', (req, res) => 
  readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)))
);


fb.post('/', (req, res) => {
  
  const { title, text } = req.body;

 
  if (title && text) {
    const newNote = {
      title,
      text,
      id:uuidv4()
    };

    readAndAppend(newNote, './db/notes.json');

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error in posting note');
  }
});

module.exports = fb;