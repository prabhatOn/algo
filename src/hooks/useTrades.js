import { useState, useEffect, useCallback } from 'react';
import { tradeService } from '../services/tradeService';

/**
 * Custom hook for trade operations
 * Handles CRUD operations, filtering, and real-time updates
 */

export const useTrades = (initialFilters = {}) => {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [filters, setFilters] = useState(initialFilters);

  const fetchTrades = useCallback(async (customFilters = {}) => {
    setLoading(true);
    setError(null);

    try {
      const result = await tradeService.getTrades({ ...filters, ...customFilters });
      if (result.success) {
        setTrades(result.data);
        setPagination(result.pagination);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch trades');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTrades();
  }, [fetchTrades]);

  const createTrade = useCallback(async (tradeData) => {
    const result = await tradeService.createTrade(tradeData);
    if (result.success) {
      await fetchTrades(); // Refresh list
    }
    return result;
  }, [fetchTrades]);

  const updateTrade = useCallback(async (id, tradeData) => {
    const result = await tradeService.updateTrade(id, tradeData);
    if (result.success) {
      await fetchTrades(); // Refresh list
    }
    return result;
  }, [fetchTrades]);

  const deleteTrade = useCallback(async (id) => {
    const result = await tradeService.deleteTrade(id);
    if (result.success) {
      await fetchTrades(); // Refresh list
    }
    return result;
  }, [fetchTrades]);

  const refresh = useCallback(() => {
    return fetchTrades();
  }, [fetchTrades]);

  const updateFilters = useCallback((newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  return {
    trades,
    loading,
    error,
    pagination,
    filters,
    createTrade,
    updateTrade,
    deleteTrade,
    refresh,
    updateFilters,
  };
};

export default useTrades;
