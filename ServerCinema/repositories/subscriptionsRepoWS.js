const axios = require("axios");

const SUBSCRIPTIONS_URL = "http://localhost:3000/subscriptions";

// Get All Subscriptions
const getAllSubscriptions = () => {
  return axios.get(SUBSCRIPTIONS_URL);
};

// Get Subscription By ID
const getSubscriptionById = (id) => {
  return axios.get(`${SUBSCRIPTIONS_URL}/${id}`);
};

// Add Subscription
const addSubscription = (subscriptionData) => {
  return axios.post(SUBSCRIPTIONS_URL, subscriptionData);
};

// Update Subscription
const updateSubscription = (id, subscriptionData) => {
  return axios.put(`${SUBSCRIPTIONS_URL}/${id}`, subscriptionData);
};

// Delete Subscription
const deleteSubscription = (id) => {
  return axios.delete(`${SUBSCRIPTIONS_URL}/${id}`);
};

module.exports = {
  getAllSubscriptions,
  getSubscriptionById,
  addSubscription,
  updateSubscription,
  deleteSubscription,
};
