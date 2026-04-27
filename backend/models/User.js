/**
 * @fileoverview Mongoose model for User.
 * @module models/User
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * User Schema
 * @typedef {Object} User
 * @property {string} _id - The unique identifier for the user.
 * @property {string} name - The name of the user.
 * @property {string} email - The email address of the user.
 * @property {string} password - The password of the user.
 * @property {Date} createdAt - The date when the user was created.
 * @property {Date} updatedAt - The date when the user was last updated.
 * @property {mongoose.Types.ObjectId[]} actors - The actors associated with the user.
 */

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
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
      message: 'Invalid email address',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  actors: [{
    type: Schema.Types.ObjectId,
    ref: 'Actor',
  }],
}, {
  timestamps: true,
});

/**
 * User Model
 * @type {mongoose.Model<User>}
 */
const User = mongoose.model('User', userSchema);

module.exports = User;