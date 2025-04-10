const membersRepo = require("../repositories/membersRepoWS");

// Get All Members
const getAllMembers = async () => {
  const { data: membersData } = await membersRepo.getAllMembers();
  return membersData;
};

// Get Member By ID
const getMemberById = async (id) => {
  const { data: memberData } = await membersRepo.getMemberById(id);
  return memberData;
};

// Add Member
const addMember = async (memberData) => {
  const { data: newMember } = await membersRepo.addMember(memberData);
  return newMember;
};

// Update Member
const updateMember = async (id, memberData) => {
  const { data: updateMember } = await membersRepo.updateMember(id, memberData);
  return updateMember;
};

// Delete Member
const deleteMember = async (id) => {
  const { data: deleteMember } = await membersRepo.deleteMember(id);
  return deleteMember;
};

module.exports = {
  getAllMembers,
  getMemberById,
  addMember,
  updateMember,
  deleteMember,
};
