const subscriptionsRepo = require("../repositories/subscriptionsRepoWS");

// Get All Subscriptions
const getAllSubscriptions = async () => {
  const { data: subscriptionsData } =
    await subscriptionsRepo.getAllSubscriptions();
  return subscriptionsData;
};

// Get Subscription By ID
const getSubscriptionById = async (id) => {
  const { data: subscriptionData } =
    await subscriptionsRepo.getSubscriptionById(id);
  return subscriptionData;
};

// Add Subscription
const addSubscription = async (subscriptionData) => {
  const { data: newSubscription } = await subscriptionsRepo.addSubscription(
    subscriptionData
  );
  return newSubscription;
};

// Update Subscription
const updateSubscription = async (id, subscriptionData) => {
  const { data: updateSubscription } =
    await subscriptionsRepo.updateSubscription(id, subscriptionData);
  return updateSubscription;
};

// Delete Subscription
const deleteSubscription = async (id) => {
  const { data: deleteSubscription } =
    await subscriptionsRepo.deleteSubscription(id);
  return deleteSubscription;
};

module.exports = {
  getAllSubscriptions,
  getSubscriptionById,
  addSubscription,
  updateSubscription,
  deleteSubscription,
};
