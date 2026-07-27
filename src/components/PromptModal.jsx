import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const PromptModal = ({ promptConfig, setPromptConfig, promptValue, setPromptValue }) => {
  return (
    <AnimatePresence>
      {promptConfig.isOpen && (
        <motion.div
          key="prompt-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-slate-950/90 backdrop-blur-sm"
        >
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl p-6">
            <h3 className="text-lg font-bold mb-4">{promptConfig.title}</h3>
            <input
              autoFocus
              type="text"
              value={promptValue}
              onChange={(e) => setPromptValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  promptConfig.onSubmit(promptValue);
                  setPromptConfig({ isOpen: false, title: '', onSubmit: null });
                }
              }}
              className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-sm outline-none mb-6 select-text no-drag text-slate-900 dark:text-white"
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setPromptConfig({ isOpen: false, title: '', onSubmit: null })}
                className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  promptConfig.onSubmit(promptValue);
                  setPromptConfig({ isOpen: false, title: '', onSubmit: null });
                }}
                className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-500/20"
              >
                Confirm
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
