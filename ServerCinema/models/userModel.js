const mongoose = require("mongoose");

// Users Schema
const usersSchema = mongoose.Schema(
  {
    userName: { type: String },
    password: { type: String },
  },
  { versionKey: false }
);

// Users Model
const Users = mongoose.model('User', usersSchema);

module.exports = Users;