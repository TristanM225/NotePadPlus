const express = require('express');
const fs = require('fs');
const apiRoutes = require('./Develop/public/assets/js/index.js');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware to parse JSON in request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up API routes
app.use('/api', apiRoutes);

app.post('/api/notes', (req, res) => {
  const note = req.body;

  // Read the existing notes from db.json
  const existingNotes = JSON.parse(fs.readFileSync('db.json'));

  // Assign a unique ID to the new note
  const newNoteId = Date.now();

  // Add the new note to the existing notes
  existingNotes.push({ id: newNoteId, ...note });

  // Write the updated notes back to db.json
  fs.writeFileSync('db.json', JSON.stringify(existingNotes));

  // Send a response indicating successful note creation
  res.status(201).json({ id: newNoteId, ...note });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


  