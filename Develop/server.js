const express = require('express');
const path = require('path');
const api = require('./routes/index.js');
const noteData = require('./db/notes.json');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);


app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/db/notes.json'))
);


app.get('/notes/:id', (req, res) => {
  const requestedID = req.params.id;
  for (let i = 0; i < noteData.length; i++) {
    if (requestedID === noteData[i].id) {
      return res.json(noteData[i]);
    }
  }

  return res.json('No match found');
});

app.delete('/notes/:id', (req, res) => {
  const requestedID = req.params.id;
  console.log(requestedID)
  for (let i = 0; i < noteData.length; i++) {
    if (requestedID === noteData[i].id) {
      noteData.remove(requestedID)
    }
  }


 });

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
