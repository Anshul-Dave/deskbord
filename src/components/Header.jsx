import React from 'react';
import { Search, Upload, Plus } from 'lucide-react';

export const Header = ({ 
  searchQuery, 
  setSearchQuery, 
  handleUpload, 
  handleCreateFolder 
}) => {
  return (
    <header className="h-20 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-10">
      <div className="flex-1 max-w-2xl relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search in drive..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-sm outline-none"
        />
      </div>

      <div className="flex items-center space-x-3 ml-8 no-drag">
        <label className="relative flex items-center space-x-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium text-sm transition-all cursor-pointer shadow-lg shadow-blue-500/20 active:scale-95">
          <Upload className="w-4 h-4" />
          <span>Upload</span>
          <input type="file" multiple className="hidden" onChange={handleUpload} />
        </label>
        <button
          onClick={handleCreateFolder}
          className="p-2.5 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 rounded-xl transition-all border border-slate-200 dark:border-slate-800"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};
