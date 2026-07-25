import React from 'react';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { cn } from '../utils';

export const Breadcrumbs = ({ currentPath, setCurrentPath, handleBack }) => {
  return (
    <div className="px-8 py-6 flex items-center justify-between">
      <div className="flex items-center space-x-2 text-sm">
        <button
          onClick={() => setCurrentPath('')}
          className="text-slate-400 hover:text-blue-500 transition-colors"
        >
          Home
        </button>
        {currentPath.split('\\').filter(Boolean).map((part, i, arr) => (
          <React.Fragment key={i}>
            <ChevronRight className="w-4 h-4 text-slate-300" />
            <button
              onClick={() => setCurrentPath(arr.slice(0, i + 1).join('\\'))}
              className={cn(
                "transition-colors",
                i === arr.length - 1 ? "text-slate-900 dark:text-white font-semibold" : "text-slate-400 hover:text-blue-500"
              )}
            >
              {part}
            </button>
          </React.Fragment>
        ))}
      </div>

      {currentPath && (
        <button
          onClick={handleBack}
          className="flex items-center space-x-1 text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      )}
    </div>
  );
};
