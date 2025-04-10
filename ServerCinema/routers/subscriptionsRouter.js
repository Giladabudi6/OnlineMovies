const express = require("express");
const subscriptionService = require("../services/subscriptionsService");

// Entry Point: http://localhost:4000/subscriptions
const router = express.Router();

// Get All Subscriptions
router.get("/", async (req, res) => {
  try {
    const subscriptions = await subscriptionService.getAllSubscriptions();
    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Subscription By ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const subscription = await subscriptionService.getSubscriptionById(id);
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }
    res.status(200).json(subscription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add New Subscription
router.post("/", async (req, res) => {
  const subscriptionData = req.body;
  try {
    const newSubscription = await subscriptionService.addSubscription(
      subscriptionData
    );
    res.status(201).json(newSubscription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Subscription
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const subscriptionData = req.body;
  try {
    const updatedSubscription = await subscriptionService.updateSubscription(
      id,
      subscriptionData
    );
    res.status(200).json(updatedSubscription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Subscription
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await subscriptionService.deleteSubscription(id);
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
