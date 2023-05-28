const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose')
const http = require('http')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const connectToMongoDB = require('./middlewares/connectToMongoDB')
const connectDB = require('./config/dbConn')
dotenv.config()

// app.use(express.static(__dirname + '/public'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// mongoose.connect(process.env.MONGODB_URL).then(() => {
//     //   console.log("Mongodb connected");
//     //   server.listen(port, () => {
//     //     console.log(`Server is listening on port ${port}`);
//     //   });
// }).catch((err) => {
//     console.log({ err });
//     process.exit(1);
// });

app.use(cors())

const ProductQC = mongoose.model(
    "ProductQC",
    mongoose.Schema({
        rfid_key: {
            type: String,
        },
        humidity: {
            type: String,
        },
        temperature: {
            type: String,
        },
    })
);


app.get('/', async (req, res) => {
    const datas = await ProductQC.find()

    return res.status(200).json({
        title: "Express Testing",
        message: "The app is working properly!",
        datas,
    });
})




app.get('/data', (req, res) => {
    return res.status(200).json({
        title: "Express Testing",
        message: "The app is working properly!",
    });
})


app.post('/', (req, res) => {
    return res.status(200).json({
        title: "Express Testing",
        message: "The app is working properly!",
        // url: process.env.MONGODB_URL,
    });
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});


// Connect to MongoDB
// mongoose
//     .connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         console.log("MongoDB connected");
//         // Start the server after successful MongoDB connection
//         startServer();
//     })
//     .catch((err) => {
//         console.error("Failed to connect to MongoDB", err);
//         process.exit(1);
//     });

// // Start the server
// function startServer() {
//     //   const http = require('http');
//     //   const port = process.env.PORT || 3000;

//     //   const server = http.createServer((req, res) => {
//     //     res.statusCode = 200;
//     //     res.setHeader('Content-Type', 'text/plain');
//     //     res.end('Hello, World!');
//     //   });

//     //   server.listen(port, () => {
//     //     console.log(`Server is listening on port ${port}`);
//     //   });

//     app.listen(port, () => {
//         console.log(`Server listening on port ${port}`);
//     });
// }


// const server = http.createServer(app);



