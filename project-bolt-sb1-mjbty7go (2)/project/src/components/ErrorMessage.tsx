import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="text-red-600 bg-red-50 px-4 py-2 rounded-lg">
      {message}
    </div>
  );
}