const jf = require("jsonfile");

const FILE = "./data/Permissions.json";

// Get All Permissions
const getAllPermissions = () => {
  return jf.readFile(FILE);
};

// Set Permissions
const setPermission = (permissionsData) => {
  jf.writeFile(FILE, permissionsData, { spaces: 1 });
};

module.exports = {
  getAllPermissions,
  setPermission,
};
