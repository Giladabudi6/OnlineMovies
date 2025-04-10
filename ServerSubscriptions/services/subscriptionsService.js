const subscriptionsRepoDB = require("../repositories/subscriptionsRepoDB");

// Get all subscriptions
const getAllSubscriptions = () => {
  return subscriptionsRepoDB.getAllSubscriptions();
};

// Get subscription by ID
const getSubscriptionById = (id) => {
  return subscriptionsRepoDB.getSubscriptionById(id);
};

// Add a new subscription
const addSubscription = async (subscriptionData) => {
  const allSubscriptions = await subscriptionsRepoDB.getAllSubscriptions();
  const existingSubscription = allSubscriptions.find(
    (subscription) => subscription.memberId === subscriptionData.memberId
  );
  if (existingSubscription) {
    throw new Error("Subscription with the same memberId already exists");
  }
  const newSubscription = await subscriptionsRepoDB.addSubscription(
    subscriptionData
  );
  return newSubscription;
};

// Update a subscription
const updateSubscription = (id, subscriptionData) => {
  return subscriptionsRepoDB.updateSubscription(id, subscriptionData);
};

// Delete a subscription
const deleteSubscription = (id) => {
  return subscriptionsRepoDB.deleteSubscription(id);
};

module.exports = {
  getAllSubscriptions,
  getSubscriptionById,
  addSubscription,
  updateSubscription,
  deleteSubscription,
};
