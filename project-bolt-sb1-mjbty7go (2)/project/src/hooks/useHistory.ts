import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Database } from '../types/database';
import { useAuth } from '../contexts/AuthContext';

type SearchHistory = Database['public']['Tables']['search_history']['Row'];

export function useHistory() {
  const { user } = useAuth();
  const [history, setHistory] = useState<SearchHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchHistory();
    }
  }, [user]);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('search_history')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setHistory(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch history');
    } finally {
      setLoading(false);
    }
  };

  const addToHistory = async (
    query: string,
    language: string,
    response: SearchHistory['response']
  ) => {
    if (!user) return;

    try {
      const { error } = await supabase.from('search_history').insert({
        user_id: user.id,
        query,
        language,
        response,
      });

      if (error) throw error;
      await fetchHistory();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add to history');
    }
  };

  const deleteHistoryItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from('search_history')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchHistory();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete history item');
    }
  };

  return {
    history,
    loading,
    error,
    addToHistory,
    deleteHistoryItem,
    refreshHistory: fetchHistory,
  };
}