const express = require('express');

const app = express();
const port = 3004;

app.get('/', (req, res) => {
    res.send('welcome to notification service!');
});

app.listen(port, () => {
    console.log(`Le serveur est en écoute sur le port ${port}: localhost:3004`);
});
