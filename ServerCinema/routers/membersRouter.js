const express = require("express");
const memberService = require("../services/membersService");

// Entry Point: http://localhost:4000/members
const router = express.Router();

// Get All Members
router.get("/", async (req, res) => {
  try {
    const members = await memberService.getAllMembers();
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Member By ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const member = await memberService.getMemberById(id);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }
    res.status(200).json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add New Member
router.post("/", async (req, res) => {
  const memberData = req.body;
  try {
    const newMember = await memberService.addMember(memberData);
    res.status(201).json(newMember);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Member
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const memberData = req.body;
  try {
    const updatedMember = await memberService.updateMember(id, memberData);
    res.status(200).json(updatedMember);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Member
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await memberService.deleteMember(id);
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
