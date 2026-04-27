/**
 * @fileoverview Mongoose model for Ad.
 * @module models/Ad
 */

const mongoose = require('mongoose');

/**
 * Ad Schema
 * @typedef {Object} Ad
 * @property {mongoose.Schema.Types.ObjectId} _id - The Ad's unique identifier.
 * @property {mongoose.Schema.Types.ObjectId} userId - The ID of the user who created the Ad.
 * @property {string} title - The title of the Ad.
 * @property {string} description - The description of the Ad.
 * @property {number} price - The price of the item in the Ad.
 * @property {string} category - The category of the Ad.
 * @property {string} location - The location of the item in the Ad.
 * @property {Date} createdAt - The date when the Ad was created.
 * @property {Date} updatedAt - The date when the Ad was last updated.
 */

const adSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  location: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
}, {
  timestamps: true,
});

/**
 * Ad Model
 * @type {mongoose.Model<Ad>}
 */
const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;