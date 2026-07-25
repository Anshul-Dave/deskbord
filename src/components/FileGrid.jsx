import React from 'react';
import { motion } from 'framer-motion';
import { Search, Download, MoreVertical, Trash2 } from 'lucide-react';
import { FileIcon } from './FileIcon';

const formatSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const FileGrid = ({
  filteredFiles,
  handleFolderClick,
  handlePreview,
  handleDownload,
  handleRename,
  handleDelete
}) => {
  if (filteredFiles.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
        <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
          <Search className="w-8 h-8" />
        </div>
        <p className="text-sm">No files found here</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {filteredFiles.map((item) => (
        <motion.div
          key={item.path}
          layout
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none dark:hover:border-blue-500/50 transition-all cursor-pointer"
          onClick={() => item.isDirectory ? handleFolderClick(item.path) : handlePreview(item)}
        >
          <div className="flex flex-col items-center text-center space-y-3">
            <FileIcon name={item.name} isDirectory={item.isDirectory} size={item.size} />
            <div className="w-full">
              <p className="text-sm font-medium truncate px-1">{item.name}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">
                {item.isDirectory ? 'Folder' : formatSize(item.size)}
              </p>
            </div>
          </div>

          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-0.5 bg-white/90 dark:bg-slate-800/90 rounded-lg shadow-sm backdrop-blur p-0.5 border border-slate-200 dark:border-slate-700">
            {!item.isDirectory && (
              <button
                onClick={(e) => { e.stopPropagation(); handleDownload(item); }}
                className="p-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg text-slate-400 hover:text-blue-500"
              >
                <Download className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={(e) => { e.stopPropagation(); handleRename(item); }}
              className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleDelete(item.path); }}
              className="p-1.5 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg text-slate-400 hover:text-rose-500"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
