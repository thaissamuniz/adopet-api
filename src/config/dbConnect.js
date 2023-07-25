require('dotenv').config({path: '../.env'});
const mongoose = require('mongoose');

mongoose.connect(process.env.DB);
let db = mongoose.connection;

module.exports = db;