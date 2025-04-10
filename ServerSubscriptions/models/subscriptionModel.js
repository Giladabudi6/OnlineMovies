const mongoose = require("mongoose");

/* Subscriptions Schema */
const subscriptionsSchema = mongoose.Schema(
  {
    memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true, unique: true },
    movies: [{
      _id: false,
      movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
      date: { type: String, required: true }
    }],
  },
  {
    versionKey: false,
  }
);

/* Subscription Model */
const Subscription = mongoose.model('Subscription', subscriptionsSchema, 'Subscriptions');

module.exports = Subscription;