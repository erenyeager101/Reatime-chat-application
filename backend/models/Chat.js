const mongoose = require('mongoose');

/**
 * Chat Schema
 * @module models/chat
 * @description Represents a chat between two users.
 */
const chatSchema = new mongoose.Schema({
  /**
   * Participants in the chat
   * @type {Array<mongoose.Schema.Types.ObjectId>}
   * @ref 'User'
   * @required
   */
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],

  /**
   * Messages in the chat
   * @type {Array<{sender: mongoose.Schema.Types.ObjectId, content: string, timestamp: Date}>}
   */
  messages: [{
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true,
      trim: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],

  /**
   * Status of the chat
   * @type {string}
   * @enum ['active', 'inactive', 'archived']
   * @default 'active'
   */
  status: {
    type: String,
    enum: ['active', 'inactive', 'archived'],
    default: 'active'
  }
}, {
  timestamps: true
});

/**
 * Send and receive texts
 * @function sendAndReceiveTexts
 * @memberof module:models/chat
 * @description Simulates sending and receiving texts in the chat.
 * @param {string} senderId - The ID of the sender.
 * @param {string} content - The content of the message.
 * @returns {Promise<mongoose.Document>} The updated chat document.
 */
chatSchema.methods.sendAndReceiveTexts = async function(senderId, content) {
  try {
    this.messages.push({
      sender: senderId,
      content: content
    });
    return await this.save();
  } catch (error) {
    throw new Error(`Error sending and receiving texts: ${error.message}`);
  }
};

/**
 * Connect with the other user
 * @function connectWithOtherUser
 * @memberof module:models/chat
 * @description Simulates connecting with the other user in the chat.
 * @returns {Promise<mongoose.Document>} The updated chat document.
 */
chatSchema.methods.connectWithOtherUser = async function() {
  try {
    this.status = 'active';
    return await this.save();
  } catch (error) {
    throw new Error(`Error connecting with the other user: ${error.message}`);
  }
};

/**
 * Chat Model
 * @type {mongoose.Model}
 */
const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;