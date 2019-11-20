const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const connection = require('./connection');

const auth = require('./routes/auth');
const apiv1 = require('./routes/apiv1');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const Connection = connection.connection;

mongoose.connect(Connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

app.use('/auth', auth);
app.use('/apiv1', apiv1);

function errorHandling(err, req, res, next) {
    res.status(500).json(err.message);
}

app.use(errorHandling);

mongoose.connection.once('open', () => {
    const port = process.env.PORT || connection.port;
    app.listen(port, () => {
        console.log('Server is open!');
    });
}).on('error', (error) => {
    console.warn('Connection failed!', error);
});
