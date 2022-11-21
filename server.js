const { json } = require('express');
const express = require('express');
const { appendFile } = require('fs');
const path = require('path');

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.sendFile(__dirname, '/public/notes.html')
});

app.post('/api/notes', (req, res) => {
    console.log(`${req.method} has been received`);
    
    const data = JSON.stringify(req.body);
    const dbJson = __dirname + '/db/db.json';

    console.log(req.body);
    console.log(data);


    // appendFile(dbJson, data, (err) => {
    //     if (err) throw err;
    //     console.log('The file has been saved!');
    // });
});

app.listen(PORT, () => {
    console.log(`App listening at port: ${PORT}`);
});