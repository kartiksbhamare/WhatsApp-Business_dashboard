import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="bg-red-100 p-3 rounded-full">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-red-900 mb-2">Something went wrong</h3>
          <p className="text-red-700">{message}</p>
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        )}
      </div>
    </div>
  );
}; 