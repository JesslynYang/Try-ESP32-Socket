const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose')
const http = require('http')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
// const connectToMongoDB = require('./middlewares/connectToMongoDB')
const { connectToDatabase } = require('./config/dbConn');
const dbConnect = require('./config/dbConn');
dotenv.config()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
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
    // await connectToDatabase()
    await dbConnect()

    // const datas = await ProductQC.find()

    return res.status(200).json({
        title: "Express Testing",
        message: "The app is working properly!",
        // datas,
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


