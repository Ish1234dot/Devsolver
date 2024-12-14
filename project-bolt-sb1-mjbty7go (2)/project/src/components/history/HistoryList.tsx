import React from 'react';
import { Clock, Trash2 } from 'lucide-react';
import { Database } from '../../types/database';
import { formatDate } from '../../utils/date';

type SearchHistory = Database['public']['Tables']['search_history']['Row'];

interface HistoryListProps {
  history: SearchHistory[];
  onDelete: (id: string) => Promise<void>;
  onSelect: (item: SearchHistory) => void;
}

export function HistoryList({ history, onDelete, onSelect }: HistoryListProps) {
  return (
    <div className="space-y-4">
      {history.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
        >
          <div className="flex justify-between items-start mb-2">
            <button
              onClick={() => onSelect(item)}
              className="text-left group"
            >
              <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600">
                How to {item.query}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>{formatDate(item.created_at)}</span>
                <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                  {item.language}
                </span>
              </div>
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="text-gray-400 hover:text-red-600 p-1"
              title="Delete"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}