import mongoose from 'mongoose';


//connect to local mongodb
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/coin_wallet', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}).then(() => console.log("DataBase connected"))


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

export {db, mongoose};
