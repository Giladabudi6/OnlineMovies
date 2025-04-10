const membersRepoWS = require("../repositories/membersRepoWS");
const membersRepoDB = require("../repositories/membersRepoDB");

// Initialize members data from WS to DB
const initializeMembersData = async () => {
  try {
    await membersRepoDB.deleteAllMembers();
    let { data } = await membersRepoWS.getAllMembers();
    const membersData = data.map(({ name, email, address }) => ({
      name,
      email,
      city: address.city,
    }));
    const insertions = membersData.map((member) =>
      membersRepoDB.addMember(member)
    );
    await Promise.all(insertions);
    console.log("Members data initialized and saved to DB");
    return membersData;
  } catch (error) {
    console.error("Error initializing members data:", error);
    throw error;
  }
};

// Get all members
const getAllMembers = () => {
  return membersRepoDB.getAllMembers();
};

// Get member by ID
const getMemberById = async (id) => {
  const member = await membersRepoDB.getMemberById(id);
  if (!member) {
    throw new Error("Member not found");
  }
  return member;
};

// Add a new member
const addMember = async (memberData) => {
  const allMembers = await membersRepoDB.getAllMembers();
  const existingMember = allMembers.find(
    (member) => member.email === memberData.email
  );
  if (existingMember) {
    throw new Error("Member with the same email already exists");
  }
  const newMember = await membersRepoDB.addMember(memberData);
  return newMember;
};

// Update an existing member
const updateMember = async (id, memberData) => {
  try {
    const allMembers = await membersRepoDB.getAllMembers();
    const existingMember = allMembers.find(
      (member) => member._id.toString() === id
    );
    if (!existingMember) {
      throw new Error("Member not found");
    }
    const emailExists = allMembers.find(
      (member) =>
        member.email === memberData.email && member._id.toString() !== id
    );
    if (emailExists) {
      throw new Error("Member with the same email already exists");
    }
    return await membersRepoDB.updateMember(id, memberData);
  } catch (error) {
    console.error("Error in updateMember Service:", error.message);
    throw error;
  }
};

// Delete a member
const deleteMember = async (id) => {
  const allMembers = await membersRepoDB.getAllMembers();
  const memberExists = allMembers.find(
    (member) => member._id.toString() === id
  );
  if (!memberExists) {
    throw new Error("Member not found");
  }
  return membersRepoDB.deleteMember(id);
};

module.exports = {
  initializeMembersData,
  getAllMembers,
  getMemberById,
  addMember,
  updateMember,
  deleteMember,
};
