const mongoose = require('mongoose');

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS
};
mongoose.connect(process.env.DB_HOST, options)
    .then(() => console.log('connected'))
    .catch(err => console.log(`connection error: ${err}`));