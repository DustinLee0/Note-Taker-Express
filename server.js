const express = require('express');
const { readFile, writeFile } = require('fs');
const path = require('path');

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


//  html routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});
//  html routes

app.get('/api/notes', (req, res) => {
    console.log(`${req.method} requested for /notes endpoint`)
    const dbNotes = readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        console.log(`${req.method} request to read db.json.`)
        console.log('inside readFile()', data)
    });
    res.json('res.json() : ' + dbNotes)
});


// app.post('/api/notes', (req, res) => {
//     console.log(`${req.method} has been received`);

//     const data = req.body;
//     console.log(data);

//     // readFile(dbJson, data, (err) => {
//     //     if (err) throw err;
//     //     console.log('The file has been saved!');
//     // });
// });

app.listen(PORT, () => {
    console.log(`App listening at port: ${PORT}`);
});