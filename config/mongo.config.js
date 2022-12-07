const mongoose = require('mongoose');
require('dotenv').config();

try {
    console.log(process.env.MONGO_URL);
    mongoose.connect(process.env.MONGO_URL);
} catch (err) {
    console.log(err);
}
