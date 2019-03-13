const mongoose = require("mongoose");

const Account = mongoose.Schema({
  account_id: {
    type: String,
    unique: true,
    required: true
  },

  // Add account fields here
});

module.exports = mongoose.model("Account", Account);
