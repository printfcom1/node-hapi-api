require('dotenv').config();
const mongoose = require('mongoose');

const connect = () => {
  mongoose.connect(process.env.DATABASE_URL2, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
  });

  db.once('open', () => {
    console.log('Connected to MongoDB');
  });
};

module.exports = {
  connect,
};
