const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

let isConnected;

exports.connectToDatabase = () => {
    if (isConnected) {
        console.log('=> using existing database connection');
        return Promise.resolve();
    }

    console.log('=> using new database connection');
    return mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        bufferCommands: false
    })
        .then(db => {
            isConnected = db.connections[0].readyState;
        });
};