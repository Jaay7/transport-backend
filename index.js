const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

var dealer = require('./routes/dealer.routes.js');
var driver = require('./routes/driver.routes.js');

var corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


app.use('/api/dealer', dealer);
app.use('/api/driver', driver);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Go to http://localhost:${PORT}`);
})