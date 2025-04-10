const express = require("express");
const membersService = require("../services/membersService");

const router = express.Router();

// Entry Point: http://localhost:3000/members

// initialize Members Data (Pull from WS and Save to DB)
router.get("/initializeMembers", async (req, res) => {
  try {
    const members = await membersService.initializeMembersData();
    res
      .status(201)
      .json({ message: "Members data initialized successfully", members });
  } catch (error) {
    res.status(500).json({
      error: "Failed to initialize members data",
      details: error.message,
    });
  }
});

// Get all members from DB
router.get("/", async (req, res) => {
  try {
    const members = await membersService.getAllMembers();
    res.status(200).json(members); // Changed from res.json(members)
  } catch (error) {
    res.status(500).json({ message: error.message }); // Changed from res.status(500).json(error)
  }
});

// Get Member by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const member = await membersService.getMemberById(id);
    if (!member) {
      return res.status(404).json({ message: "Member not found" }); // Added 404 for not found
    }
    res.status(200).json(member); // Changed from res.json(member)
  } catch (error) {
    res.status(500).json({ message: error.message }); // Changed from res.status(500).json(error)
  }
});

// Add a new Member
router.post("/", async (req, res) => {
  try {
    const memData = req.body;
    const newMem = await membersService.addMember(memData);
    res.status(201).json(newMem);
  } catch (error) {
    res.status(409).json({ error: error.message }); // Changed from 400 to 409 for conflict (email exists)
  }
});

// Update a Member
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const memData = req.body;
    const result = await membersService.updateMember(id, memData);
    if (!result) {
      return res.status(404).json({ message: "Member not found" }); // Added 404 for not found
    }
    res.status(200).json(result); // Changed from res.json(result)
  } catch (error) {
    res.status(500).json({ message: error.message }); // Changed from res.status(500).json(error)
  }
});

// Delete a Member
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMem = await membersService.deleteMember(id);
    if (!deletedMem) {
      return res.status(404).json({ message: "Member not found" }); // Added 404 for not found
    }
    res.status(200).json(deletedMem); // Changed from res.json(deletedMem) - could also be 204 No Content
  } catch (error) {
    res.status(500).json({ message: error.message }); // Changed from res.status(500).json(error)
  }
});

module.exports = router;
