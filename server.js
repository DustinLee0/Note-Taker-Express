const express = require('express');
const { readFile, writeFile } = require('fs');
const dbJson = require('./db/db.json');
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

    const data = req.body;
    console.log(data);

    readFile(dbJson, data, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
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