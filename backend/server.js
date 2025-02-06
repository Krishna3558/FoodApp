const express = require('express');
const app = express();
const userAuth = require('./routes/userAuth');
const foodRoutes = require('./routes/foodRoutes');
const orderRoutes = require('./routes/orderRoutes');
require('dotenv').config();
const db = require('./db');

const cors = require('cors');
app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use('/user' , userAuth );
app.use('/food' , foodRoutes );
app.use('/orders' , orderRoutes);

const PORT = process.env.PORT || 3000;
app.listen( PORT , () => {
    console.log("app listen on port " , PORT);
})