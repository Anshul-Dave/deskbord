import React from 'react';
import { HardDrive, Folder, Sun, Moon } from 'lucide-react';
import { cn } from '../utils';

const formatSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const Sidebar = ({ 
  darkMode, 
  setDarkMode, 
  currentPath, 
  setCurrentPath, 
  storageInfo 
}) => {
  const storagePercentage = storageInfo ? (storageInfo.usedSize / storageInfo.totalSize) * 100 : 0;

  return (
    <aside className={cn("w-64 border-r flex flex-col p-6 space-y-8 transition-colors duration-300",
      darkMode ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-900")}>
      <div className="flex items-center space-x-3 mt-4">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
          <HardDrive className="text-white w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold tracking-tight">My Drive</h1>
      </div>

      <nav className="flex-1 space-y-1">
        <button
          onClick={() => setCurrentPath('')}
          className={cn(
            "w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all",
            currentPath === '' ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 font-medium" : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400"
          )}
        >
          <Folder className="w-5 h-5" />
          <span>Home</span>
        </button>
      </nav>

      <div className="space-y-4">
        {storageInfo && (
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl space-y-3">
            <div className="flex justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <span>Storage</span>
              <span>{storagePercentage.toFixed(1)}%</span>
            </div>
            <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-500"
                style={{ width: `${Math.min(storagePercentage, 100)}%` }}
              />
            </div>
            <p className="text-xs text-slate-400">
              {formatSize(storageInfo.usedSize)} used of {formatSize(storageInfo.totalSize)}
            </p>
          </div>
        )}

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="w-full flex items-center justify-between px-4 py-2 text-sm text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <div className="flex items-center space-x-2">
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            <span>{darkMode ? 'Light' : 'Dark'} Mode</span>
          </div>
        </button>
      </div>
    </aside>
  );
};
