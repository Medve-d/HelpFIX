const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  U_name: String,
  nom: String,
  prenom: String,
  email: String,
  password: String,
  RoleType: String,
  created_at: { type: Date, default: Date.now },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String,
  },
  number: String,
  last_log: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
