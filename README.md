# Note Taker: Express
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A note taking application built with [express.js](https://expressjs.com/) to handle requests sent between the client  and the server. The app also utilizes the [uuid](https://www.npmjs.com/package/uuid) library to generate unique id's for each note saved. Application deployed on [Heroku](https://id.heroku.com/).

## Installation
Dependencies needed to run this application are [express.js](https://expressjs.com/) and [uuid.v4()](https://www.npmjs.com/package/uuid).

Install dependencies by running this code in the directory:
```
npm i
```

## Usage
The app directs the user to a landing page. Once the user starts the app, they will be brought to a page where previously saved notes are displayed on the left, and a section on the right to write and save a new note. The user can save new notes or delete previously saved notes. When a saved note is clicked, the contents of the note will be displayed on the right. 

## License
This application is licensed under the [MIT License](https://opensource.org/licenses/MIT).

### Notes
Utilized [Insomnia](https://insomnia.rest/) to test endpoints while building app to ensure the right responses/requests were being sent. Using a RESTful API to store data in a file is much more convenient, logical and robust compared to storing data in local storage as that can only be accessed from the local machine it is saved on. 