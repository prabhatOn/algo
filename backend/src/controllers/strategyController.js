import { Strategy, User } from '../models/index.js';
import { Op } from 'sequelize';
import { emitStrategyUpdate, emitDashboardUpdate } from '../config/socket.js';

// Get user's strategies
export const getUserStrategies = async (req, res) => {
  try {
    const userId = req.user.id;
    const { segment, isActive, page = 1, limit = 10, search } = req.query;

    const where = { userId };
    if (segment) where.segment = segment;
    if (isActive !== undefined) where.isActive = isActive === 'true';
    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } }
      ];
    }

    const offset = (page - 1) * limit;

    const strategies = await Strategy.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset,
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: strategies.rows,
      pagination: {
        total: strategies.count,
        page: parseInt(page),
        pages: Math.ceil(strategies.count / limit),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Get strategies error:', error);
    res.status(500).json({ error: 'Failed to fetch strategies' });
  }
};

// Create strategy
export const createStrategy = async (req, res) => {
  try {
    const userId = req.user.id;
    const { 
      name, segment, capital, symbol, symbolValue, legs, 
      description, type, madeBy, createdBy 
    } = req.body;

    const strategy = await Strategy.create({
      userId,
      name,
      segment,
      capital,
      symbol,
      symbolValue,
      legs: legs || 1,
      description,
      type: type || 'Private',
      madeBy: madeBy || 'User',
      createdBy,
      isActive: true,
      isRunning: false,
      isPublic: type === 'Public',
      isFavorite: false
    });

    // Emit real-time update
    emitStrategyUpdate(userId, strategy, 'create');
    emitDashboardUpdate(userId, { strategies: { new: strategy } });

    res.status(201).json({
      success: true,
      message: 'Strategy created successfully',
      data: strategy
    });
  } catch (error) {
    console.error('Create strategy error:', error);
    res.status(500).json({ error: 'Failed to create strategy' });
  }
};

// Get strategy by ID
export const getStrategyById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const strategy = await Strategy.findOne({
      where: { id, userId }
    });

    if (!strategy) {
      return res.status(404).json({ error: 'Strategy not found' });
    }

    res.json({
      success: true,
      data: strategy
    });
  } catch (error) {
    console.error('Get strategy error:', error);
    res.status(500).json({ error: 'Failed to fetch strategy' });
  }
};

// Update strategy
export const updateStrategy = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const updateData = req.body;

    const strategy = await Strategy.findOne({
      where: { id, userId }
    });

    if (!strategy) {
      return res.status(404).json({ error: 'Strategy not found' });
    }

    // Don't allow updating certain fields
    delete updateData.userId;
    delete updateData.id;
    delete updateData.createdAt;

    await strategy.update(updateData);

    res.json({
      success: true,
      message: 'Strategy updated successfully',
      data: strategy
    });
  } catch (error) {
    console.error('Update strategy error:', error);
    res.status(500).json({ error: 'Failed to update strategy' });
  }
};

// Delete strategy
export const deleteStrategy = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const strategy = await Strategy.findOne({
      where: { id, userId }
    });

    if (!strategy) {
      return res.status(404).json({ error: 'Strategy not found' });
    }

    await strategy.destroy();

    res.json({
      success: true,
      message: 'Strategy deleted successfully'
    });
  } catch (error) {
    console.error('Delete strategy error:', error);
    res.status(500).json({ error: 'Failed to delete strategy' });
  }
};

// Toggle strategy running status
export const toggleStrategyRunning = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const strategy = await Strategy.findOne({
      where: { id, userId }
    });

    if (!strategy) {
      return res.status(404).json({ error: 'Strategy not found' });
    }

    await strategy.update({
      isRunning: !strategy.isRunning,
      lastUpdated: new Date().toISOString()
    });

    // Emit real-time update for status change
    emitStrategyUpdate(userId, strategy, 'status_change');
    emitDashboardUpdate(userId, { strategies: { statusChanged: strategy } });

    res.json({
      success: true,
      message: `Strategy ${strategy.isRunning ? 'started' : 'stopped'} successfully`,
      data: strategy
    });
  } catch (error) {
    console.error('Toggle strategy error:', error);
    res.status(500).json({ error: 'Failed to toggle strategy' });
  }
};

// Start strategy
export const startStrategy = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const strategy = await Strategy.findOne({ where: { id, userId } });
    if (!strategy) return res.status(404).json({ error: 'Strategy not found' });
    await strategy.update({ isRunning: true, lastUpdated: new Date().toISOString() });
    emitStrategyUpdate(userId, strategy, 'started');
    emitDashboardUpdate(userId, { strategies: { statusChanged: strategy } });
    res.json({ success: true, message: 'Strategy started successfully', data: strategy });
  } catch (error) {
    console.error('Start strategy error:', error);
    res.status(500).json({ error: 'Failed to start strategy' });
  }
};

// Stop strategy
export const stopStrategy = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const strategy = await Strategy.findOne({ where: { id, userId } });
    if (!strategy) return res.status(404).json({ error: 'Strategy not found' });
    await strategy.update({ isRunning: false, lastUpdated: new Date().toISOString() });
    emitStrategyUpdate(userId, strategy, 'stopped');
    emitDashboardUpdate(userId, { strategies: { statusChanged: strategy } });
    res.json({ success: true, message: 'Strategy stopped successfully', data: strategy });
  } catch (error) {
    console.error('Stop strategy error:', error);
    res.status(500).json({ error: 'Failed to stop strategy' });
  }
};

// Activate strategy (make public)
export const activateStrategy = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const strategy = await Strategy.findOne({ where: { id, userId } });
    if (!strategy) return res.status(404).json({ error: 'Strategy not found' });
    await strategy.update({ isPublic: true, isActive: true, lastUpdated: new Date().toISOString() });
    res.json({ success: true, message: 'Strategy activated successfully', data: strategy });
  } catch (error) {
    console.error('Activate strategy error:', error);
    res.status(500).json({ error: 'Failed to activate strategy' });
  }
};

// Deactivate strategy (make private)
export const deactivateStrategy = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const strategy = await Strategy.findOne({ where: { id, userId } });
    if (!strategy) return res.status(404).json({ error: 'Strategy not found' });
    await strategy.update({ isPublic: false, lastUpdated: new Date().toISOString() });
    res.json({ success: true, message: 'Strategy deactivated successfully', data: strategy });
  } catch (error) {
    console.error('Deactivate strategy error:', error);
    res.status(500).json({ error: 'Failed to deactivate strategy' });
  }
};

// Toggle favorite status
export const toggleFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const strategy = await Strategy.findOne({
      where: { id, userId }
    });

    if (!strategy) {
      return res.status(404).json({ error: 'Strategy not found' });
    }

    await strategy.update({
      isFavorite: !strategy.isFavorite
    });

    res.json({
      success: true,
      message: `Strategy ${strategy.isFavorite ? 'added to' : 'removed from'} favorites`,
      data: strategy
    });
  } catch (error) {
    console.error('Toggle favorite error:', error);
    res.status(500).json({ error: 'Failed to toggle favorite' });
  }
};

// Get marketplace (public strategies)
export const getMarketplaceStrategies = async (req, res) => {
  try {
    const { segment, page = 1, limit = 12, search } = req.query;

    const where = { isPublic: true, type: 'Public' };
    if (segment) where.segment = segment;
    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } }
      ];
    }

    const offset = (page - 1) * limit;

    const strategies = await Strategy.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset,
      order: [['performance', 'DESC']],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'username']
        }
      ]
    });

    res.json({
      success: true,
      data: strategies.rows,
      pagination: {
        total: strategies.count,
        page: parseInt(page),
        pages: Math.ceil(strategies.count / limit),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Get marketplace error:', error);
    res.status(500).json({ error: 'Failed to fetch marketplace strategies' });
  }
};

// Admin: Get all strategies
export const getAllStrategies = async (req, res) => {
  try {
    const { segment, page = 1, limit = 20, search } = req.query;

    const where = {};
    if (segment) where.segment = segment;
    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } }
      ];
    }

    const offset = (page - 1) * limit;

    const strategies = await Strategy.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email', 'username']
        }
      ]
    });

    res.json({
      success: true,
      data: strategies.rows,
      pagination: {
        total: strategies.count,
        page: parseInt(page),
        pages: Math.ceil(strategies.count / limit),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Get all strategies error:', error);
    res.status(500).json({ error: 'Failed to fetch strategies' });
  }
};
