const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const connection = require('./connection');

const auth = require('./routes/auth');
const apiv1 = require('./routes/apiv1');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect(connection.connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

mongoose.connection.once('open', () => {
    console.log('Connection is open!');

    const port = process.env.PORT || 8080;
    app.listen(port, () => {
        console.log('Server is open!');
    });
}).on('error', (error) => {
    console.warn('Connection failed!', error);
});

app.all('*', (req, res, next) => {
    next();
});

app.use('/apiv1', apiv1);
app.use('/auth', auth);

function errorHandling(err, req, res, next) {
    res.status(500).json(err.message);
    console.log(err);
}

app.use(errorHandling);

module.exports = app;
