const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');


router.get('/', (req, res) =>
  readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)))
);


router.post('/', (req, res) => {

  const { title, text } = req.body;


  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuidv4()
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

router.delete('/:id', (req, res) => {
  readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)))
    const requestedID = req.params.id;
    for (let i = 0; i < data.length; i++) {
      if (requestedID != data[i].id) {
        writeToFile('./db/notes.json', data);
      }
    }
});


module.exports = router;