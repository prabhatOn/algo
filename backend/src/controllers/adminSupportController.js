import { SupportTicket, SupportMessage, User } from '../models/index.js';
import { Op } from 'sequelize';
import { sequelize } from '../config/database.js';

// Get all support tickets (admin)
export const getAllTickets = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', status, priority, category, userId } = req.query;

    const where = {};
    if (search) {
      where[Op.or] = [
        { subject: { [Op.like]: `%${search}%` } },
        { ticketNumber: { [Op.like]: `%${search}%` } }
      ];
    }
    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (category) where.category = category;
    if (userId) where.userId = userId;

    const offset = (page - 1) * limit;

    const tickets = await SupportTicket.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'email', 'phone']
        },
        {
          model: SupportMessage,
          as: 'messages',
          separate: true,
          order: [['createdAt', 'ASC']],
          include: [
            {
              model: User,
              as: 'author',
              attributes: ['id', 'username']
            }
          ]
        }
      ]
    });

    res.json({
      success: true,
      data: {
        tickets: tickets.rows,
        pagination: {
          total: tickets.count,
          page: parseInt(page),
          pages: Math.ceil(tickets.count / limit),
          limit: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get all tickets error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch tickets' });
  }
};

// Get ticket by ID (admin)
export const getTicketById = async (req, res) => {
  try {
    const { id } = req.params;

    const ticket = await SupportTicket.findByPk(id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'email', 'phone']
        },
        {
          model: SupportMessage,
          as: 'messages',
          order: [['createdAt', 'ASC']],
          include: [
            {
              model: User,
              as: 'author',
              attributes: ['id', 'username', 'role']
            }
          ]
        }
      ]
    });

    if (!ticket) {
      return res.status(404).json({ success: false, message: 'Ticket not found' });
    }

    res.json({ success: true, data: ticket });
  } catch (error) {
    console.error('Get ticket error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch ticket' });
  }
};

// Update ticket (admin)
export const updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, priority, category, assignedTo } = req.body;

    const ticket = await SupportTicket.findByPk(id);
    if (!ticket) {
      return res.status(404).json({ success: false, message: 'Ticket not found' });
    }

    const updateData = {};
    if (status) updateData.status = status;
    if (priority) updateData.priority = priority;
    if (category) updateData.category = category;
    if (assignedTo !== undefined) updateData.assignedTo = assignedTo;

    await ticket.update(updateData);

    const updatedTicket = await SupportTicket.findByPk(id, {
      include: [
        { model: User, as: 'user', attributes: ['id', 'username', 'email'] },
        { model: SupportMessage, as: 'messages' }
      ]
    });

    res.json({ success: true, message: 'Ticket updated successfully', data: updatedTicket });
  } catch (error) {
    console.error('Update ticket error:', error);
    res.status(500).json({ success: false, message: 'Failed to update ticket' });
  }
};

// Reply to ticket (admin)
export const replyToTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    const adminId = req.user.id;

    const ticket = await SupportTicket.findByPk(id);
    if (!ticket) {
      return res.status(404).json({ success: false, message: 'Ticket not found' });
    }

    const newMessage = await SupportMessage.create({
      ticketId: id,
      authorId: adminId,
      message,
      isAdminReply: true
    });

    // Update ticket status if it was open
    if (ticket.status === 'Open') {
      await ticket.update({ status: 'In Progress' });
    }

    res.json({ success: true, message: 'Reply sent successfully', data: newMessage });
  } catch (error) {
    console.error('Reply to ticket error:', error);
    res.status(500).json({ success: false, message: 'Failed to send reply' });
  }
};

// Delete ticket (admin)
export const deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;

    const ticket = await SupportTicket.findByPk(id);
    if (!ticket) {
      return res.status(404).json({ success: false, message: 'Ticket not found' });
    }

    await ticket.destroy();
    res.json({ success: true, message: 'Ticket deleted successfully' });
  } catch (error) {
    console.error('Delete ticket error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete ticket' });
  }
};

// Get ticket statistics (admin)
export const getTicketStats = async (req, res) => {
  try {
    const [stats] = await sequelize.query(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'Open' THEN 1 ELSE 0 END) as open,
        SUM(CASE WHEN status = 'In Progress' THEN 1 ELSE 0 END) as inProgress,
        SUM(CASE WHEN status = 'Resolved' THEN 1 ELSE 0 END) as resolved,
        SUM(CASE WHEN status = 'Closed' THEN 1 ELSE 0 END) as closed,
        SUM(CASE WHEN priority = 'Low' THEN 1 ELSE 0 END) as lowPriority,
        SUM(CASE WHEN priority = 'Medium' THEN 1 ELSE 0 END) as mediumPriority,
        SUM(CASE WHEN priority = 'High' THEN 1 ELSE 0 END) as highPriority
      FROM support_tickets
    `);

    res.json({ success: true, data: stats[0] });
  } catch (error) {
    console.error('Get ticket stats error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch statistics' });
  }
};
