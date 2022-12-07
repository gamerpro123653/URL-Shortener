const mongoose = require('mongoose');
require('dotenv').config();

try {
    mongoose.connect(process.env.MONGO_URL);
} catch (err) {
    console.log(err);
}
