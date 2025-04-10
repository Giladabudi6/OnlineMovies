const subscription = require("../models/subscriptionModel");

// Get All Subscription
const getAllSubscriptions = () => {
  return subscription.find();
};

// Get Subscription By ID
const getSubscriptionById = (id) => {
  return subscription.findById(id);
};

// Create Subscription
const addSubscription = (subscriptionData) => {
  const sub = new subscription(subscriptionData);
  return sub.save();
};

// Update Subscription by memberId
const updateSubscription = (id, subscriptionData) => {
  return subscription.findByIdAndUpdate(id, subscriptionData, { new: true });
};

// Delete Subscription by memberId
const deleteSubscription = (id) => {
  return subscription.findByIdAndDelete(id);
};

module.exports = {
  getAllSubscriptions,
  getSubscriptionById,
  addSubscription,
  updateSubscription,
  deleteSubscription,
};
