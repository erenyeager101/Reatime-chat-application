const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserService {
  async createUser(userData) {
    try {
      const { username, email, password } = userData;

      // Check if user already exists
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        throw new Error('User already exists');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });

      // Save user to database
      await newUser.save();

      // Generate JWT token
      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      return { user: newUser, token };
    } catch (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  async loginUser(credentials) {
    try {
      const { email, password } = credentials;

      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User not found');
      }

      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      return { user, token };
    } catch (error) {
      throw new Error(`Failed to login user: ${error.message}`);
    }
  }

  async getUserById(userId) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error(`Failed to get user: ${error.message}`);
    }
  }

  async updateUser(userId, updateData) {
    try {
      const { username, email, password } = updateData;

      // Check if user exists
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      // Update user data
      if (username) user.username = username;
      if (email) user.email = email;
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
      }

      // Save updated user to database
      await user.save();

      return user;
    } catch (error) {
      throw new Error(`Failed to update user: ${error.message}`);
    }
  }

  async deleteUser(userId) {
    try {
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error(`Failed to delete user: ${error.message}`);
    }
  }
}

module.exports = new UserService();