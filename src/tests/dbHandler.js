const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer = new MongoMemoryServer();

exports.dbConnect = async () => {
  await mongoServer.start();
  return mongoServer.getUri();
};

exports.dbDisconnect = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
};