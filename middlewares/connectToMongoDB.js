const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const connectToMongoDB = async (err, req, res, next) => {
    const connection = await mongoose.connect(process.env.MONGODB_URL).then(() => {
        //   console.log("Mongodb connected");
        //   server.listen(port, () => {
        //     console.log(`Server is listening on port ${port}`);
        //   });
        // next()
    }).catch((err) => {
        console.log({ err });
        process.exit(1);
    });

    if(connection) next()
}

module.exports = connectToMongoDB