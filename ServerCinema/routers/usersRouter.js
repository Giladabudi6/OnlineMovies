const express = require("express");
const usersService = require("../services/usersService");
const bcrypt = require("bcrypt");

const router = express.Router();

// Entry Point: http://localhost:4000/users

// Get All Users
router.get("/", async (req, res) => {
  try {
    const users = await usersService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get User By ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await usersService.getUserById(id);
    res.json(user);
  } catch (error) {
    if (error.message === "User not found") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

// Add New User
router.post("/", async (req, res) => {
  const newUser = req.body;
  try {
    const addedUser = await usersService.addUser(newUser);
    res.status(201).json(addedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update User
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;
  try {
    const user = await usersService.updateUser(id, updatedUser);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete User
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await usersService.deleteUser(id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Handle user login
router.post("/login", async (req, res) => {
  const { userName, password } = req.body;

  try {
    const user = await usersService.getUserByUserName(userName);

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    } // Verify the password

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      res.status(200).json({ message: "Login successful", userId: user._id });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
});

module.exports = router;
