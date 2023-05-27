const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose')
const http = require('http')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
dotenv.config()

// app.use(express.static(__dirname + '/public'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors())

app.get('/', (req, res) => {
    return res.status(200).json({
        title: "Express Testing",
        message: "The app is working properly!",
    });
})

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

app.get('/data', async (req, res) => {
    return res.status(200).json({
        title: "Express Testing",
        message: "The app is working properly!",
    });
    // try {
    //     const datas = await ProductQC.findOne()
    //     return res.status(200).json({ datas });
    // } catch (err) {
    //     res.status(500).json({ err })
    // }
})


app.post('/', (req, res) => {
    return res.status(200).json({
        title: "Express Testing",
        message: "The app is working properly!",
    });
})

// app.listen(3000, () => {
//     console.log('Server listening on port 3000');
// });


const port = process.env.PORT || 5000;

const server = http.createServer(app);

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Mongodb connected");
    server.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
}).catch((err) => {
    console.log({ err });
    process.exit(1);
});