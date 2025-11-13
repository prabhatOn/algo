import { ApiKey, Broker } from '../models/index.js';
import { Op } from 'sequelize';

// Get user's API keys
export const getUserApiKeys = async (req, res) => {
  try {
    const userId = req.user.id;
    const { segment, status, page = 1, limit = 10 } = req.query;

    const where = { userId };
    if (segment) where.segment = segment;
    if (status) where.status = status;

    const offset = (page - 1) * limit;

    const apiKeys = await ApiKey.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Broker,
          as: 'broker',
          attributes: ['id', 'name', 'segment', 'logoUrl']
        }
      ],
      attributes: { exclude: ['apiKey', 'apiSecret'] } // Don't send actual keys
    });

    res.json({
      success: true,
      data: apiKeys.rows,
      pagination: {
        total: apiKeys.count,
        page: parseInt(page),
        pages: Math.ceil(apiKeys.count / limit),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Get API keys error:', error);
    res.status(500).json({ error: 'Failed to fetch API keys' });
  }
};

// Create API key
export const createApiKey = async (req, res) => {
  try {
    const userId = req.user.id;
    const { 
      brokerId, brokerName, segment, apiKey, apiSecret, 
      additionalData, isDefault 
    } = req.body;

    // Validate broker exists
    if (brokerId) {
      const broker = await Broker.findByPk(brokerId);
      if (!broker) {
        return res.status(404).json({ error: 'Broker not found' });
      }
    }

    // If setting as default, unset other defaults for this segment
    if (isDefault) {
      await ApiKey.update(
        { isDefault: false },
        { where: { userId, segment } }
      );
    }

    const newApiKey = await ApiKey.create({
      userId,
      brokerId,
      brokerName: brokerName || (brokerId ? (await Broker.findByPk(brokerId)).name : null),
      segment,
      apiKey,
      apiSecret,
      additionalData: additionalData || {},
      status: 'Active',
      isDefault: isDefault || false,
      isVerified: false
    });

    // Don't return actual keys
    const response = newApiKey.toJSON();
    delete response.apiKey;
    delete response.apiSecret;

    res.status(201).json({
      success: true,
      message: 'API key created successfully',
      data: response
    });
  } catch (error) {
    console.error('Create API key error:', error);
    res.status(500).json({ error: 'Failed to create API key' });
  }
};

// Get API key by ID (with actual keys for verification)
export const getApiKeyById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const apiKey = await ApiKey.findOne({
      where: { id, userId },
      include: [
        {
          model: Broker,
          as: 'broker',
          attributes: ['id', 'name', 'segment', 'apiBaseUrl']
        }
      ]
    });

    if (!apiKey) {
      return res.status(404).json({ error: 'API key not found' });
    }

    res.json({
      success: true,
      data: apiKey
    });
  } catch (error) {
    console.error('Get API key error:', error);
    res.status(500).json({ error: 'Failed to fetch API key' });
  }
};

// Update API key
export const updateApiKey = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const updateData = req.body;

    const apiKey = await ApiKey.findOne({
      where: { id, userId }
    });

    if (!apiKey) {
      return res.status(404).json({ error: 'API key not found' });
    }

    // If setting as default, unset other defaults for this segment
    if (updateData.isDefault) {
      await ApiKey.update(
        { isDefault: false },
        { where: { userId, segment: apiKey.segment, id: { [Op.ne]: id } } }
      );
    }

    // Don't allow updating certain fields
    delete updateData.userId;
    delete updateData.id;
    delete updateData.createdAt;

    await apiKey.update(updateData);

    // Don't return actual keys
    const response = apiKey.toJSON();
    delete response.apiKey;
    delete response.apiSecret;

    res.json({
      success: true,
      message: 'API key updated successfully',
      data: response
    });
  } catch (error) {
    console.error('Update API key error:', error);
    res.status(500).json({ error: 'Failed to update API key' });
  }
};

// Delete API key
export const deleteApiKey = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const apiKey = await ApiKey.findOne({
      where: { id, userId }
    });

    if (!apiKey) {
      return res.status(404).json({ error: 'API key not found' });
    }

    await apiKey.destroy();

    res.json({
      success: true,
      message: 'API key deleted successfully'
    });
  } catch (error) {
    console.error('Delete API key error:', error);
    res.status(500).json({ error: 'Failed to delete API key' });
  }
};

// Verify API key
export const verifyApiKey = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const apiKey = await ApiKey.findOne({
      where: { id, userId },
      include: [
        {
          model: Broker,
          as: 'broker'
        }
      ]
    });

    if (!apiKey) {
      return res.status(404).json({ error: 'API key not found' });
    }

    // TODO: Implement actual verification logic with broker API
    // This is a placeholder - you'll need to integrate with each broker's API
    const isValid = true; // Replace with actual verification

    await apiKey.update({
      isVerified: isValid,
      lastVerified: new Date(),
      status: isValid ? 'Active' : 'Invalid'
    });

    res.json({
      success: true,
      message: isValid ? 'API key verified successfully' : 'API key verification failed',
      data: {
        isVerified: isValid,
        status: apiKey.status
      }
    });
  } catch (error) {
    console.error('Verify API key error:', error);
    res.status(500).json({ error: 'Failed to verify API key' });
  }
};

// Set default API key for segment
export const setDefaultApiKey = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const apiKey = await ApiKey.findOne({
      where: { id, userId }
    });

    if (!apiKey) {
      return res.status(404).json({ error: 'API key not found' });
    }

    // Unset other defaults for this segment
    await ApiKey.update(
      { isDefault: false },
      { where: { userId, segment: apiKey.segment, id: { [Op.ne]: id } } }
    );

    // Set this one as default
    await apiKey.update({ isDefault: true });

    res.json({
      success: true,
      message: 'Default API key set successfully',
      data: apiKey
    });
  } catch (error) {
    console.error('Set default API key error:', error);
    res.status(500).json({ error: 'Failed to set default API key' });
  }
};

// Admin: Get all API keys
export const getAllApiKeys = async (req, res) => {
  try {
    const { segment, status, page = 1, limit = 20 } = req.query;

    const where = {};
    if (segment) where.segment = segment;
    if (status) where.status = status;

    const offset = (page - 1) * limit;

    const apiKeys = await ApiKey.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Broker,
          as: 'broker',
          attributes: ['id', 'name', 'segment']
        }
      ],
      attributes: { exclude: ['apiKey', 'apiSecret'] }
    });

    res.json({
      success: true,
      data: apiKeys.rows,
      pagination: {
        total: apiKeys.count,
        page: parseInt(page),
        pages: Math.ceil(apiKeys.count / limit),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Get all API keys error:', error);
    res.status(500).json({ error: 'Failed to fetch API keys' });
  }
};
