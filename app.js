const express = require('express');
const mongoose = require('mongoose');
//const fs = require('fs');
const path = require('path');


const app = express();



app.use(express.static(path.join(__dirname, 'public')));

const config = require('./config');

const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');


const port = process.env.PORT || config.port;

require('./db');


app.use(compression()); // Compress all routes 
app.use(helmet()); // protect against vulnerability 

app.use(bodyParser.json()); // for parsing application/json 
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded



// api routes index
app.get('/api/v1/index', (req, res) => {
    res.json({ message: 'Welcome to ' + config.appName });
});


const eventRoutes = require('./api/routes/events');


// middleware for allowing cross origin requests
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, api_key, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    //console.log('req.query', req.query, req.query.API_KEY);
    // console.log('env '+app.get('env'));

    if (req.query.API_KEY) {
        const API_KEY = req.query.API_KEY;
        //console.log('API_KEY ', API_KEY);
        if (API_KEY == undefined) {
            return res.status(401).json({ message: "API_KEY undefined" });
        }
        if (API_KEY != (process.env.API_KEY || config.API_KEY)) {
            return res.status(401).json({ message: "Invalid API_KEY" });
        }
    }
    else {
        return res.status(401).json({ message: "API_KEY not provided" });
    }

    //console.log('headers', req.headers);
    //console.log('authorization', req.headers.authorization);
    if (req.headers && req.headers.authorization) {
        const authorization = req.get('authorization');
        //console.log("authorization " + authorization);
        const token = authorization.split('Bearer ')[1];
        jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY || config.JWT_SECRET_KEY,
            function (err, decode) {
                if (err) req.user = undefined;
                req.user = decode;
                //console.log('success');
                next();
            });
    }
    else {
        req.user = undefined;
        //console.log('failed');
        next();
    }
});

// api routes v1

app.use('/api/v1/events', eventRoutes);



// catch 404 and forward to error handler
app.use((req, res, next) => {
    const error = new Error('Path Not found');
    error.status = 404;
    next(error);
});

// error handler
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((error, req, res) => {
        console.log('no request match error ', error);
        res.status(error.status || 500);
        res.json({
            error: {
                message: error.message,
                error: error
            }
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res) {
    //log.error("Something went wrong:", err);
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(port, () => {
    console.log(config.appName + ' listening on port ' + port);
});



//console.log('env', app.get('env'));