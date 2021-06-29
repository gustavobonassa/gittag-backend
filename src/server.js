const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()

const server = express();
server.use(cors());

const routes = require('./routes');

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

server.use(express.json());
server.use(routes);

server.listen(process.env.PORT || 3333);
