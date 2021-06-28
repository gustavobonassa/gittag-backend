const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({
  tags: {
    type: Array,
    required: true,
  },
  repository: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Tag", TagSchema);
