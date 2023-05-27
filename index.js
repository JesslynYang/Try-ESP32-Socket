const express = require('express');
const app = express();
const cors = require('cors')

app.use(express.static(__dirname + '/public'));

app.use(cors())

app.get('/', (req, res) => {
    return res.status(200).json({
        title: "Express Testing",
        message: "The app is working properly!",
    });
})


app.post('/', (req, res) => {
    return res.status(200).json({
        title: "Express Testing",
        message: "The app is working properly!",
    });
})

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
