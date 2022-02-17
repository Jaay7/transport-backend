const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

var dealer = require('./routes/dealer.routes.js');
var driver = require('./routes/driver.routes.js');

var corsOptions = {
  origin: 'http://localhost:4200',
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
// app.use(express.json());

// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/dealer', dealer);
app.use('/api/driver', driver);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Go to http://localhost:${PORT}`);
})