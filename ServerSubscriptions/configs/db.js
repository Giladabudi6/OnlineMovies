const mongoose = require('mongoose');

const connectDB = () => {
  // mongoose.connect('mongodb://127.0.0.1:27017/SubscriptionsDB')
  mongoose
    .connect('mongodb://localhost:27017/SubscriptionsDB')
    .then(() => console.log('connected to SubscriptionsDB'))
    .catch(console.log);
};

module.exports = connectDB;
