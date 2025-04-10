const axios = require("axios");

const MEMBERS_URL = "http://localhost:3000/members";

// Get All Members
const getAllMembers = () => {
  return axios.get(MEMBERS_URL);
};

// Get Member By ID
const getMemberById = (id) => {
  return axios.get(`${MEMBERS_URL}/${id}`);
};

// Add Member
const addMember = (memberData) => {
  return axios.post(MEMBERS_URL, memberData);
};

// Update Member
const updateMember = (id, memberData) => {
  return axios.put(`${MEMBERS_URL}/${id}`, memberData);
};

// Delete Member
const deleteMember = (id) => {
  return axios.delete(`${MEMBERS_URL}/${id}`);
};

module.exports = {
  getAllMembers,
  getMemberById,
  addMember,
  updateMember,
  deleteMember,
};
