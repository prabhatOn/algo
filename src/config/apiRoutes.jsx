/**
 * API Route Constants
 * Centralized endpoint definitions for the entire application
 */

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const API_ROUTES = {
  // Authentication
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh-token',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
    verifyEmail: '/auth/verify-email',
    profile: '/auth/profile',
  },

  // Dashboard
  dashboard: {
    platform: '/dashboard/stats',
    user: '/dashboard/user',
    admin: '/dashboard/admin',
  },

  // Users Management
  users: {
    base: '/users',
    byId: (id) => `/users/${id}`,
    profile: '/users/profile',
    updateProfile: '/users/profile',
    changePassword: '/users/change-password',
    list: '/users',
    create: '/users',
    update: (id) => `/users/${id}`,
    delete: (id) => `/users/${id}`,
    stats: '/users/stats',
  },

  // Trades
  trades: {
    base: '/trades',
    byId: (id) => `/trades/${id}`,
    list: '/trades',
    create: '/trades',
    update: (id) => `/trades/${id}`,
    delete: (id) => `/trades/${id}`,
    stats: '/trades/stats',
    recent: '/trades/recent',
    byStrategy: (strategyId) => `/trades?strategyId=${strategyId}`,
    export: '/trades/export',
  },

  // Strategies
  strategies: {
    base: '/strategies',
    byId: (id) => `/strategies/${id}`,
    list: '/strategies',
    create: '/strategies',
    update: (id) => `/strategies/${id}`,
    delete: (id) => `/strategies/${id}`,
    activate: (id) => `/strategies/${id}/activate`,
    deactivate: (id) => `/strategies/${id}/deactivate`,
    start: (id) => `/strategies/${id}/start`,
    stop: (id) => `/strategies/${id}/stop`,
    stats: (id) => `/strategies/${id}/stats`,
    public: '/strategies/public',
    clone: (id) => `/strategies/${id}/clone`,
  },

  // API Keys
  apiKeys: {
    base: '/api-keys',
    byId: (id) => `/api-keys/${id}`,
    list: '/api-keys',
    create: '/api-keys',
    update: (id) => `/api-keys/${id}`,
    delete: (id) => `/api-keys/${id}`,
    validate: '/api-keys/validate',
    rotate: (id) => `/api-keys/${id}/rotate`,
  },

  // Plans & Subscriptions
  plans: {
    base: '/plans',
    catalog: '/plans/catalog',
    byId: (id) => `/plans/${id}`,
    current: '/plans/current',
    subscribe: '/plans/subscribe',
    cancel: '/plans/cancel',
    upgrade: '/plans/upgrade',
    history: '/plans/history',
  },

  // Wallet
  wallet: {
    base: '/wallet',
    balance: '/wallet/balance',
    transactions: '/wallet/transactions',
    deposit: '/wallet/deposit',
    withdraw: '/wallet/withdraw',
    history: '/wallet/history',
  },

  // Support Tickets
  support: {
    base: '/support',
    byId: (id) => `/support/${id}`,
    list: '/support',
    create: '/support',
    update: (id) => `/support/${id}`,
    close: (id) => `/support/${id}/close`,
    reply: (id) => `/support/${id}/reply`,
    stats: '/support/stats',
  },

  // Notifications
  notifications: {
    base: '/notifications',
    byId: (id) => `/notifications/${id}`,
    list: '/notifications',
    unread: '/notifications/unread',
    markRead: (id) => `/notifications/${id}/read`,
    markAllRead: '/notifications/mark-all-read',
    delete: (id) => `/notifications/${id}`,
    preferences: '/notifications/preferences',
  },
};

// Helper to build full URL
export const buildUrl = (path) => {
  if (path.startsWith('http')) return path;
  return `${API_BASE}${path}`;
};

// Export base URL for direct access
export const API_BASE_URL = API_BASE;

export default API_ROUTES;
