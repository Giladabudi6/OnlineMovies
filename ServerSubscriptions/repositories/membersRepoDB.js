const member = require("../models/memberModel");

// Get All Member
const getAllMembers = () => {
  return member.find();
};

// Get Member By ID
const getMemberById = (id) => {
  return member.findById(id);
};

// Create Member
const addMember = (memberData) => {
  const mem = new member(memberData);
  return mem.save();
};

// Update Member
const updateMember = (id, memberData) => {
  return member.findByIdAndUpdate(id, memberData, { new: true });
};

// Delete Member
const deleteMember = (id) => {
  return member.findByIdAndDelete(id);
};

// Delete All Members
const deleteAllMembers = () => {
  return member.deleteMany({});
};

module.exports = {
  getAllMembers,
  getMemberById,
  addMember,
  updateMember,
  deleteMember,
  deleteAllMembers,
};
