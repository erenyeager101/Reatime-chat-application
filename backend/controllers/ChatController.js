const Chat = require('../models/Chat');
const { validationResult } = require('express-validator');

class ChatController {
  // GET /api/chats
  static async getAllChats(req, res) {
    try {
      const chats = await Chat.find();
      res.status(200).json({
        success: true,
        data: chats,
        message: 'Chats retrieved successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message
      });
    }
  }

  // POST /api/chats
  static async createChat(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array()
      });
    }

    try {
      const chat = new Chat(req.body);
      await chat.save();
      res.status(201).json({
        success: true,
        data: chat,
        message: 'Chat created successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message
      });
    }
  }

  // PUT /api/chats/:id
  static async updateChat(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array()
      });
    }

    try {
      const chat = await Chat.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!chat) {
        return res.status(404).json({
          success: false,
          message: 'Chat not found'
        });
      }
      res.status(200).json({
        success: true,
        data: chat,
        message: 'Chat updated successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message
      });
    }
  }

  // DELETE /api/chats/:id
  static async deleteChat(req, res) {
    try {
      const chat = await Chat.findByIdAndDelete(req.params.id);
      if (!chat) {
        return res.status(404).json({
          success: false,
          message: 'Chat not found'
        });
      }
      res.status(200).json({
        success: true,
        data: chat,
        message: 'Chat deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message
      });
    }
  }
}

module.exports = ChatController;