const mongoose = require("mongoose");

/* Members Schema */
const membersSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    city: { type: String, required: true },
  },
  { versionKey: false }
);

/* Member Model */
const Member = mongoose.model('Member', membersSchema);

module.exports = Member;