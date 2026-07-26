import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';
import { FileIcon } from './FileIcon';

const formatSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']; 
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const PreviewModal = ({ previewItem, previewData, setPreviewItem, setPreviewData }) => {
  return (
    <AnimatePresence>
      {previewItem && (
        <motion.div
          key="preview-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-slate-950/90 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-5xl h-full flex flex-col bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center space-x-3">
                <FileIcon name={previewItem.name} isDirectory={false} size={previewItem.size} />
                <div>
                  <h3 className="font-bold">{previewItem.name}</h3>
                  <p className="text-xs text-slate-400">
                    {formatSize(previewItem.size)} • Modified {new Date(previewItem.modified).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => window.electronAPI && window.electronAPI.openFile(previewItem.path)}
                  className="flex items-center space-x-2 px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-sm transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open with System</span>
                </button>
                <button
                  onClick={() => { setPreviewItem(null); setPreviewData(null); }}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto flex items-center justify-center p-8 bg-slate-100 dark:bg-slate-800/50">
              {previewItem.name.toLowerCase().endsWith('.pdf') ? (
                <iframe
                  title="PDF Preview"
                  src={`data:application/pdf;base64,${previewData}`}
                  className="w-full h-full border-none rounded-xl bg-white"
                />
              ) : (
                <img
                  src={`data:image/${previewItem.name.split('.').pop()};base64,${previewData}`}
                  alt={previewItem.name}
                  className="max-w-full max-h-full object-contain rounded-xl shadow-lg"
                />
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
