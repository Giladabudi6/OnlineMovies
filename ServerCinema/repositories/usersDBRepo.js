const user = require("../models/userModel");

// Get All Users
const getAllUsers = () => {
  return user.find();
};

// Get User By ID
const getUserById = (id) => {
  return user.findById(id);
};

// Add User
const addUser = async (userData) => {
  const newUser = new user(userData);
  const savedUser = await newUser.save();
  return savedUser._id;
};

// Update User
const updateUser = (id, userData) => {
  return user.findByIdAndUpdate(id, userData, { new: true });
};

// Delete User
const deleteUser = (id) => {
  return user.findByIdAndDelete(id);
};

// Delete All Users
const deleteAllUsers = () => {
  return user.deleteMany({});
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  deleteAllUsers,
};
