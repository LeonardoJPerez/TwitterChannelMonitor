const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const connReady = require('mongoose-connection-ready');

const CONNECTION_STRING = 'mongodb://notifier:V3TvwXV2X5ZFh52U@ds115071.mlab.com:15071/bird-watcher';

mongoose.connect(CONNECTION_STRING);

const db = mongoose.connection;

const closeConnection = () => {
    mongoose
        .connection
        .close(() => console.log('Connection closed.')); // TODO: Add telemetry.
};

module.exports = {
    heartbeat: () => {
        connReady(db)
            .then(function () {
                console.log('Mongo connected successfully!');
                // TODO: Add telemetry.

                setTimeout(() => {
                    closeConnection();
                }, 2000);
            })
            .catch((err) => {
                console.error('Could not connect to Mongo.');
                // TODO: Add telemetry.

                closeConnection();
            });
    },
    save: (model, cb) => {
        model.save((err, savedModel) => {
            if (err) 
                return console.error(err); // TODO: Add telemetry.
            
            // TODO: Add telemetry.

            cb(savedModel);
        });
    }
};
