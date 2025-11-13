import { User } from '../models/index.js';
import { validationResult } from 'express-validator';

// Get user profile
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findByPk(userId, {
      attributes: {
        exclude: ['password'] // Don't send password in response
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Format the response to match frontend expectations
    const profileData = {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone || '',
      status: user.status,
      currency: user.currency,
      emailVerified: user.emailVerified,
      phoneVerified: user.phoneVerified,
      password: '********', // Mask password
      referralCode: user.referralCode || '',
      referralLink: user.referralLink || '',
      referredBy: user.referredBy || '',
      joinedBy: user.joinedBy ? user.joinedBy.toISOString().split('T')[0] : '',
      clientId: user.clientId || '',
      clientType: user.clientType,
      organizationName: user.organizationName || '',
      incorporationNumber: user.incorporationNumber || '',
      taxId: user.taxId || '',
      gstNumber: user.gstNumber || '',
      panNumber: user.panNumber || '',
      address1: user.address1 || '',
      address2: user.address2 || '',
      city: user.city || '',
      state: user.state || '',
      country: user.country || '',
      postalCode: user.postalCode || '',
      contactPhone: user.contactPhone || '',
      contactEmail: user.contactEmail || '',
      kycStatus: user.kycStatus,
      kycLevel: user.kycLevel || '',
      documents: user.documents || '',
      verified: user.verified,
      avatar: user.avatar || '',
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    res.json({
      success: true,
      data: profileData
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.user.id;
    const updateData = req.body;

    // Remove sensitive fields that shouldn't be updated directly
    delete updateData.password;
    delete updateData.role;
    delete updateData.id;
    delete updateData.createdAt;
    delete updateData.updatedAt;

    // Find and update user
    const [updatedRowsCount] = await User.update(updateData, {
      where: { id: userId }
    });

    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Fetch updated user data
    const updatedUser = await User.findByPk(userId, {
      attributes: {
        exclude: ['password']
      }
    });

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedUser
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

// Upload avatar
const uploadAvatar = async (req, res) => {
  try {
    const userId = req.user.id;
    const avatarUrl = req.body.avatarUrl; // Assuming avatar URL is provided

    await User.update(
      { avatar: avatarUrl },
      { where: { id: userId } }
    );

    res.json({
      success: true,
      message: 'Avatar updated successfully'
    });
  } catch (error) {
    console.error('Upload avatar error:', error);
    res.status(500).json({ error: 'Failed to upload avatar' });
  }
};

export {
  getProfile,
  updateProfile,
  uploadAvatar
};