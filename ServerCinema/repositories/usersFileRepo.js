const jf = require("jsonfile");

const FILE = "./data/Users.json";

// Get All Users
const getAllUsers = () => {
  return jf.readFile(FILE);
};

// Get User By ID
const getUserById = async (id) => {
  const users = await jf.readFile(FILE);
  const user = users.find((u) => u._id === id);
  if (!user) {
    throw new Error(`User with ID ${id} not found.`);
  }
  return user;
};

// Set Users
const setUser = (usersData) => {
  jf.writeFile(FILE, usersData, { spaces: 1 });
};

module.exports = {
  getAllUsers,
  getUserById,
  setUser,
};
