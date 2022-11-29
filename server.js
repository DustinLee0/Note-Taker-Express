const express = require('express');
const { readFile, writeFile, write } = require('fs');
const { v4: uuidv4 } = require('uuid')
const path = require('path');

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

//  api routes to GET and POST json file
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './db/db.json'))
});

app.post('/api/notes', (req, res) => {
    console.log(`${req.method} has been received`);
    const { title, text } = req.body;

    if (title && text) {
        const id = uuidv4();
        const newNote = {
            title: title,
            text: text,
            id: id
        }
        const response = {
            message: 'Note Saved',
            note: newNote
        }
        
        readFile('./db/db.json', (err, data) => {
            if (err) throw err;
            const jsonData = JSON.parse(data);
            jsonData.push(newNote);
            
            writeFile('./db/db.json', JSON.stringify(jsonData), (err) => {
                if (err) throw err;
                console.log('New notes saved to db.json file.');
            });
        });
        res.status(201).json(response);

    } else {
        res.status(400).send('Error in posting note. Please make sure you have a title and text to save.')
    }

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

// const dbNotes = readFile('./db/db.json', 'utf8', async (err, data) => {
//     if (err) throw err;
//     console.log(`${req.method} request to read db.json.`)
//     console.log('inside readFile()', data);
//     });

// console.log(`${req.method} requested for /notes endpoint`)
// try {
//     const dbNotes = readFile('./db/db.json', 'utf8', (err, data) => {
//         if (err) throw err;
//         console.log(`${req.method} request to read db.json.`)
//         console.log('inside readFile()', data)
//         console.log('readFile return value: ', dbNotes)
//     })
// } catch (err) {
//     console.error(err.message);
// }

// import { readFile } from 'node:fs/promises';
// try {
//     const filePath = new URL('./package.json', import.meta.url);
//     const contents = await readFile(filePath, { encoding: 'utf8' });
//     console.log(contents);
// } catch (err) {
//     console.error(err.message);
// }