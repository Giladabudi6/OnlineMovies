const mongoose = require('mongoose');

const connectDB = () => {
  // mongoose.connect('mongodb://127.0.0.1:27017/UsersDB')
  mongoose
    .connect('mongodb://localhost:27017/UsersDB')
    .then(() => console.log('connected to UsersDB'))
    .catch(console.log);
};

module.exports = connectDB;
