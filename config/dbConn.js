const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

// let isConnected;

// exports.connectToDatabase = () => {
//     if (isConnected) {
//         console.log('=> using existing database connection');
//         return Promise.resolve();
//     }

//     console.log('=> using new database connection');
//     return mongoose.connect(process.env.MONGODB_URL, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         bufferCommands: false
//     })
//         .then(db => {
//             isConnected = db.connections[0].readyState;
//         });
// };

const MONGODB_URI = process.env.MONGODB_URL
if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    )
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        }

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose
        })
    }

    try {
        cached.conn = await cached.promise
    } catch (e) {
        cached.promise = null
        throw e
    }

    return cached.conn
}

module.exports = dbConnect