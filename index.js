const express = require('express');
const app = express();
require('dotenv').config();
require('./config/mongo.config');

const urlRoute = require('./routes/url.route');
const staticRoute = require('./routes/static.route');

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));

app.use(urlRoute);
app.use(staticRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
})

