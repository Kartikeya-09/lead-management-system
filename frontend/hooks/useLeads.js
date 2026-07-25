import { useState, useEffect, useCallback } from 'react';
import api from '../lib/axios';

export const useLeads = (queryParams = {}) => {
  const [data, setData] = useState({ data: [], total: 0, page: 1, limit: 10 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get('/leads', { params: queryParams });
      setData(res.data);
      setError(null);
    } catch (err) {
      setError(err?.response?.data?.error?.message || 'Failed to fetch leads');
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(queryParams)]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  return { ...data, loading, error, refetch: fetchLeads };
};
