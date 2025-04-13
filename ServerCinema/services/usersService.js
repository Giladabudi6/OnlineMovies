const usersFileRepo = require("../repositories/usersFileRepo");
const usersDBRepo = require("../repositories/usersDBRepo");
const permissionsFileRepo = require("../repositories/permissionsFileRepo");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// Get all users with combined data
const getAllUsers = async () => {
  try {
    const usersFile = await usersFileRepo.getAllUsers();
    const permissionsFile = await permissionsFileRepo.getAllPermissions();
    const usersDB = await usersDBRepo.getAllUsers();

    if (!usersFile || usersFile.length === 0) {
      throw new Error("No users found in the system.");
    }

    return usersFile.map((user) => {
      const userDb = usersDB.find(
        (u) => u._id.toString() === user._id.toString()
      );
      const userPermissions =
        permissionsFile.find((p) => p._id.toString() === user._id.toString()) ||
        {};

      return {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        createdDate: user.createdDate,
        sessionTimeOut: user.sessionTimeOut,
        permissions: userPermissions.permissions || [],
        userName: userDb?.userName,
        password: userDb?.password || "",
      };
    });
  } catch (error) {
    throw new Error(`Failed to fetch users: ${error.message}`);
  }
};

// Get user by ID with combined data
const getUserById = async (id) => {
  try {
    const users = await getAllUsers();
    const user = users.find((u) => u._id === id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error(`Failed to fetch user by ID: ${error.message}`);
  }
};

// Add a new user to all repositories
const addUser = async (userData) => {
  try {
    const permissionsFile = await permissionsFileRepo.getAllPermissions();
    const usersFile = await usersFileRepo.getAllUsers();
    const usersDB = await usersDBRepo.getAllUsers();

    if (usersDB.some((u) => u.userName === userData.userName)) {
      throw new Error("User with the same userName already exists");
    }

    const userDb = { userName: userData.userName, password: "" };
    const newId = await usersDBRepo.addUser(userDb);

    const newUserFile = {
      _id: newId,
      firstName: userData.firstName,
      lastName: userData.lastName,
      createdDate: new Date().toISOString().split("T")[0],
      sessionTimeOut: userData.sessionTimeOut,
    };
    await usersFileRepo.setUser([...usersFile, newUserFile]);

    const newPermission = {
      _id: newId,
      permissions: userData.permissions || [],
    };
    await permissionsFileRepo.setPermission([
      ...permissionsFile,
      newPermission,
    ]);

    return { ...userData, _id: newId };
  } catch (error) {
    throw new Error(`Failed to add user: ${error.message}`);
  }
};

// Update a user in all repositories
const updateUser = async (id, userData) => {
  try {
    const usersDB = await usersDBRepo.getAllUsers();
    const usersFile = await usersFileRepo.getAllUsers();
    const permissionsFile = await permissionsFileRepo.getAllPermissions();

    const userExistsInDB = usersDB.some((user) => user._id.toString() === id);
    if (!userExistsInDB) {
      throw new Error("User not found");
    }

    if (
      usersDB.some(
        (user) =>
          user.userName === userData.userName && user._id.toString() !== id
      )
    ) {
      throw new Error("User with the same userName already exists");
    }

    let hashedPassword = userData.password;
    if (userData.password) {
      // Hash the password before updating
      hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    }

    await usersDBRepo.updateUser(id, {
      userName: userData.userName,
      password: hashedPassword,
    });

    const updatedUsersFile = usersFile.map((user) =>
      user._id === id
        ? {
            ...user,
            firstName: userData.firstName,
            lastName: userData.lastName,
            sessionTimeOut: userData.sessionTimeOut,
          }
        : user
    );
    await usersFileRepo.setUser(updatedUsersFile);

    const updatedPermissionsFile = permissionsFile.map((perm) =>
      perm._id === id ? { ...perm, permissions: userData.permissions } : perm
    );
    await permissionsFileRepo.setPermission(updatedPermissionsFile);

    return userData;
  } catch (error) {
    throw new Error(`Failed to update user: ${error.message}`);
  }
};

// Delete a user from all repositories
const deleteUser = async (id) => {
  try {
    const usersFile = await usersFileRepo.getAllUsers();
    const permissionsFile = await permissionsFileRepo.getAllPermissions();

    const userExistsInUsersFile = usersFile.some(
      (user) => user._id.toString() === id
    );
    if (!userExistsInUsersFile) {
      throw new Error("User not found");
    }

    await usersDBRepo.deleteUser(id);

    await usersFileRepo.setUser(usersFile.filter((user) => user._id !== id));

    await permissionsFileRepo.setPermission(
      permissionsFile.filter((perm) => perm._id !== id)
    );

    return { message: `User ${id} deleted successfully` };
  } catch (error) {
    throw new Error(`Failed to delete user: ${error.message}`);
  }
};

// Get user by username
const getUserByUserName = async (userName) => {
  try {
    const usersDB = await usersDBRepo.getAllUsers();
    return usersDB.find((user) => user.userName === userName);
  } catch (error) {
    throw new Error(`Failed to fetch user by username: ${error.message}`);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  getUserByUserName,
};
