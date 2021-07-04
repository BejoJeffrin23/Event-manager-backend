const mongoose = require('mongoose');
const config = require('./config');

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: process.env.useCreateIndex || config.useCreateIndex,
    useFindAndModify: process.env.useFindAndModify || config.useFindAndModify,
    autoIndex: process.env.autoIndex || config.autoIndex,
    // Reconnect every 500ms
    poolSize: process.env.poolSize || config.poolSize,
    // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: process.env.bufferMaxEntries || config.bufferMaxEntries,
    connectTimeoutMS: process.env.connectTimeoutMS || config.connectTimeoutMS,
    // Give up initial connection after 10 seconds
    socketTimeoutMS: process.env.socketTimeoutMS || config.socketTimeoutMS,
    // Close sockets after 45 seconds of inactivity
    family: process.env.family || config.family, // Use IPv4, skip trying IPv6

    /* replicaSet: 'rs' */
};

let dbUrl = process.env.MONGODB_URI || config.mongodbUrl;

//prod db
//dbUrl = 'mongodb+srv://jamelahUser:jamelah02371@cluster0-f7vhq.mongodb.net/jamelahDb?retryWrites=true';

//Set up default mongoose connection
mongoose.Promise = global.Promise;

if (process.env.NODE_ENV === 'development') {
    // mongoose.set('debug', process.env.dbDebugOption || config.dbDebugOption);
}

//Set up default mongoose connection
mongoose.connect(dbUrl, options);
//mongoose.connect(dbUrl, {replicaSet: 'rs'}); //used for creating indexes

//Get the default connection
const dbConnection = mongoose.connection;

dbConnection.on('connecting', function () {
    console.log('Connecting to Database...');
});

//Bind connection to error event (to get notification of connection errors)
dbConnection.on('error', function (err) {
    console.log('Could not connect to the database. Exiting now...');
    console.log(err);
    process.exit();
});

dbConnection.once('open', function () {
    console.log('Connection open');
});

dbConnection.on('connected', function () {
    console.log('Connected to Database...');
});

dbConnection.on('disconnected', function () {
    console.log('Database connection is disconnected');
});

dbConnection.on('reconnected', function () {
    console.log('Connection reconnected!');
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function () {
    dbConnection.close(function () {
        console.log('Database connection disconnected through app termination');
        process.exit(0);
    });
});

//console.log("db file ");