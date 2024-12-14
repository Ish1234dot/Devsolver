import React, { useState } from 'react';
import { useHistory } from '../hooks/useHistory';
import { HistoryList } from '../components/history/HistoryList';
import { ResponseDisplay } from '../components/ResponseDisplay';
import { Database } from '../types/database';
import { DashboardLayout } from '../components/layout/DashboardLayout';

type SearchHistory = Database['public']['Tables']['search_history']['Row'];

export function HistoryPage() {
  const { history, loading, error, deleteHistoryItem } = useHistory();
  const [selectedItem, setSelectedItem] = useState<SearchHistory | null>(null);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      await deleteHistoryItem(id);
      if (selectedItem?.id === id) {
        setSelectedItem(null);
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Search History</h1>
        
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="text-red-600 bg-red-50 p-4 rounded-lg">
            {error}
          </div>
        ) : history.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No search history yet
          </div>
        ) : (
          <div className="space-y-8">
            <HistoryList
              history={history}
              onDelete={handleDelete}
              onSelect={setSelectedItem}
            />
            
            {selectedItem && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Selected Result
                </h2>
                <ResponseDisplay
                  response={selectedItem.response}
                  language={selectedItem.language}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}