const axios = require("axios");

const MEMBERS_URL = "https://jsonplaceholder.typicode.com/users";

// Get All Members
const getAllMembers = () => {
  return axios.get(MEMBERS_URL);
};

module.exports = {
  getAllMembers,
};
