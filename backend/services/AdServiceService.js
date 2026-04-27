const Ad = require('../models/Ad');

class AdService {
  /**
   * Create a new ad
   * @param {Object} adData - Ad data
   * @returns {Promise<Object>} - Created ad
   */
  async createAd(adData) {
    try {
      const ad = new Ad(adData);
      return await ad.save();
    } catch (error) {
      throw new Error(`Error creating ad: ${error.message}`);
    }
  }

  /**
   * Get all ads
   * @returns {Promise<Array>} - List of ads
   */
  async getAllAds() {
    try {
      return await Ad.find();
    } catch (error) {
      throw new Error(`Error fetching ads: ${error.message}`);
    }
  }

  /**
   * Get ad by ID
   * @param {string} adId - Ad ID
   * @returns {Promise<Object>} - Ad object
   */
  async getAdById(adId) {
    try {
      const ad = await Ad.findById(adId);
      if (!ad) {
        throw new Error('Ad not found');
      }
      return ad;
    } catch (error) {
      throw new Error(`Error fetching ad: ${error.message}`);
    }
  }

  /**
   * Update ad by ID
   * @param {string} adId - Ad ID
   * @param {Object} updateData - Update data
   * @returns {Promise<Object>} - Updated ad
   */
  async updateAd(adId, updateData) {
    try {
      const ad = await Ad.findByIdAndUpdate(adId, updateData, { new: true });
      if (!ad) {
        throw new Error('Ad not found');
      }
      return ad;
    } catch (error) {
      throw new Error(`Error updating ad: ${error.message}`);
    }
  }

  /**
   * Delete ad by ID
   * @param {string} adId - Ad ID
   * @returns {Promise<Object>} - Deleted ad
   */
  async deleteAd(adId) {
    try {
      const ad = await Ad.findByIdAndDelete(adId);
      if (!ad) {
        throw new Error('Ad not found');
      }
      return ad;
    } catch (error) {
      throw new Error(`Error deleting ad: ${error.message}`);
    }
  }
}

module.exports = new AdService();