/**
 * @fileoverview Mongoose model for User.
 * @module models/User
 */

const mongoose = require('mongoose');

/**
 * User Schema
 * @typedef {Object} User
 * @property {string} _id - The unique identifier for the user.
 * @property {string} username - The username of the user.
 * @property {string} email - The email address of the user.
 * @property {string} password - The password of the user.
 * @property {Date} createdAt - The date when the user was created.
 * @property {Date} updatedAt - The date when the user was last updated.
 * @property {mongoose.Schema.Types.ObjectId[]} chats - The chats associated with the user.
 * @property {mongoose.Schema.Types.ObjectId} premiumMembership - The premium membership associated with the user.
 * @property {mongoose.Schema.Types.ObjectId} profile - The profile information associated with the user.
 * @property {mongoose.Schema.Types.ObjectId} ads - The ads associated with the user.
 */

/**
 * User Schema
 * @type {mongoose.Schema<User>}
 */
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: (value) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: 'Invalid email address'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  chats: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat'
  }],
  premiumMembership: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PremiumMembership'
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile'
  },
  ads: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ad'
  }]
}, {
  timestamps: true
});

/**
 * User Model
 * @type {mongoose.Model<User>}
 */
const User = mongoose.model('User', userSchema);

module.exports = User;