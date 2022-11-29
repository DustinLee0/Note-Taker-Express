const express = require('express');
const { readFile, writeFile } = require('fs');
const { v4: uuidv4 } = require('uuid')
const path = require('path');

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

//  api routes to GET, POST and DELETE json file
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './db/db.json'))
});

app.post('/api/notes', (req, res) => {
    console.log(`${req.method} method has been received`);
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title: title,
            text: text,
            id: uuidv4()
        }
        const response = {
            status: '201 - Created',
            message: 'Note Saved',
            data: newNote
        }
        //  read current file -> push new note to array -> write file again 
        readFile('./db/db.json', (err, data) => {
            if (err) throw err;
            const jsonData = JSON.parse(data);
            jsonData.push(newNote);

            writeFile('./db/db.json', JSON.stringify(jsonData), (err) => {
                if (err) throw err;
                console.log('New note saved to db.json file.');
            });
        });
        res.status(201).json(response);
    } else {
        res.status(400).send('Error posting note. Please make sure you have a title and text to save.');
    }
});

app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    console.log(`${req.method} method has been received.`)

    readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        const jsonData = JSON.parse(data);
        const deleteNote = jsonData.filter(note => note.id === id);

        const response = {
            status: '200 - OK',
            message: 'Note Deleted',
            data: deleteNote
        };
        
        // use findIndex() method to target note with specific id in array
        const deleteIndex = jsonData.findIndex(note => {
            if (note.id === id) {
                return note;
            };
        });

        jsonData.splice(deleteIndex, 1);

        writeFile('./db/db.json', JSON.stringify(jsonData), (err) => {
            if (err) throw err;
            console.log('Note deleted from database.');
        });


        res.status(200).json(response);
    });
});

//  html routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));

});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});


app.listen(PORT, () => {
    console.log(`App listening at port: ${PORT}`);
});