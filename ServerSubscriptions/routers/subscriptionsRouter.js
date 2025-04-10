const express = require("express");
const subscriptionsService = require("../services/subscriptionsService");

const router = express.Router();

// Entry Point: http://localhost:3000/subscriptions

// Get all Subscriptions
router.get("/", async (req, res) => {
  try {
    const subscriptions = await subscriptionsService.getAllSubscriptions();
    res.status(200).json(subscriptions); // Changed from res.json(subscriptions)
  } catch (error) {
    res.status(500).json({ message: error.message }); // Changed from res.status(500).json(error)
  }
});

// Get Subscription by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const subscription = await subscriptionsService.getSubscriptionById(id);
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" }); // Added 404 for not found
    }
    res.status(200).json(subscription); // Changed from res.json(subscription)
  } catch (error) {
    res.status(500).json({ message: error.message }); // Changed from res.status(500).json(error)
  }
});

// Add a new Subscription
router.post("/", async (req, res) => {
  try {
    const subData = req.body;
    const newSub = await subscriptionsService.addSubscription(subData);
    res.status(201).json(newSub);
  } catch (error) {
    res.status(409).json({ error: error.message }); // Changed from 400 to 409 for conflict (memberId exists)
  }
});

// Update a Subscription
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const subData = req.body;
    const result = await subscriptionsService.updateSubscription(id, subData);
    if (!result) {
      return res.status(404).json({ message: "Subscription not found" }); // Added 404 for not found
    }
    res.status(200).json(result); // Changed from res.json(result)
  } catch (error) {
    res.status(500).json({ message: error.message }); // Changed from res.status(500).json(error)
  }
});

// Delete a Subscription
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSub = await subscriptionsService.deleteSubscription(id);
    if (!deletedSub) {
      return res.status(404).json({ message: "Subscription not found" }); // Added 404 for not found
    }
    res.status(200).json(deletedSub); // Changed from res.json(deletedSub) - could also be 204 No Content
  } catch (error) {
    res.status(500).json({ message: error.message }); // Changed from res.status(500).json(error)
  }
});

module.exports = router;
