const express = require("express");
const app = express();
const mongodb = require("./src/config/db");
const bodyParser = require("body-parser");
const errorHandler = require('./src/middleware/errorHandler');
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})

app.use('/', require('./src/routes'));
app.use(errorHandler);

mongodb.intMongo((err) => {
    if (err) {
        console.log(err);
    }
    else {
        app.listen(port, () => { console.log(`Database is listening and node is running on port ${port}`) });
    }
});