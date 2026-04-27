const Chat = require('../models/Chat');
const User = require('../models/User');

class ChatService {
  async createChat(userId, participants) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      const chat = new Chat({
        participants: [userId, ...participants],
        messages: []
      });

      await chat.save();
      return chat;
    } catch (error) {
      throw new Error(`Failed to create chat: ${error.message}`);
    }
  }

  async getChatById(chatId) {
    try {
      const chat = await Chat.findById(chatId).populate('participants', 'username');
      if (!chat) {
        throw new Error('Chat not found');
      }
      return chat;
    } catch (error) {
      throw new Error(`Failed to get chat: ${error.message}`);
    }
  }

  async getUserChats(userId) {
    try {
      const chats = await Chat.find({ participants: userId }).populate('participants', 'username');
      return chats;
    } catch (error) {
      throw new Error(`Failed to get user chats: ${error.message}`);
    }
  }

  async addMessage(chatId, senderId, content) {
    try {
      const chat = await Chat.findById(chatId);
      if (!chat) {
        throw new Error('Chat not found');
      }

      chat.messages.push({ sender: senderId, content });
      await chat.save();
      return chat;
    } catch (error) {
      throw new Error(`Failed to add message: ${error.message}`);
    }
  }

  async deleteChat(chatId) {
    try {
      const chat = await Chat.findByIdAndDelete(chatId);
      if (!chat) {
        throw new Error('Chat not found');
      }
      return chat;
    } catch (error) {
      throw new Error(`Failed to delete chat: ${error.message}`);
    }
  }
}

module.exports = new ChatService();