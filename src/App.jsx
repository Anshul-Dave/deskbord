import React, { useState, useEffect, useCallback } from 'react';
import { cn } from './utils';

import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Breadcrumbs } from './components/Breadcrumbs';
import { FileGrid } from './components/FileGrid';
import { PreviewModal } from './components/PreviewModal';
import { PromptModal } from './components/PromptModal';

export default function App() {
  const [files, setFiles] = useState([]);
  const [currentPath, setCurrentPath] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [storageInfo, setStorageInfo] = useState({ usedSize: 0, fileCount: 0, totalSize: 50 * 1024 * 1024 * 1024 });
  const [darkMode, setDarkMode] = useState(false);
  const [previewItem, setPreviewItem] = useState(null);
  const [previewData, setPreviewData] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isElectron, setIsElectron] = useState(false);
  const [promptConfig, setPromptConfig] = useState({ isOpen: false, title: '', onSubmit: null });
  const [promptValue, setPromptValue] = useState('');

  useEffect(() => {
    setIsElectron(!!window.electronAPI);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const loadFiles = useCallback(async (path = currentPath) => {
    if (!window.electronAPI) return;
    try {
      const items = await window.electronAPI.getFiles(path);
      setFiles(items);
      const info = await window.electronAPI.getStorageInfo();
      setStorageInfo(info);
    } catch (err) {
      console.error("Failed to load files:", err);
    }
  }, [currentPath]);

  useEffect(() => {
    loadFiles();
  }, [loadFiles]);

  const handleFolderClick = (folderPath) => {
    setCurrentPath(folderPath);
  };

  const handleBack = () => {
    const parts = currentPath.split('\\');
    parts.pop();
    setCurrentPath(parts.join('\\'));
  };

  const handleDelete = async (itemPath) => {
    if (!isElectron) return alert('Delete only works in Electron app!');
    if (confirm('Are you sure you want to delete this item?')) {
      await window.electronAPI.deleteItem(itemPath);
      loadFiles();
    }
  };

  const handleCreateFolder = async () => {
    if (!isElectron) return alert('Folder creation only works in Electron app!');
    setPromptValue('');
    setPromptConfig({
      isOpen: true,
      title: 'Enter folder name:',
      onSubmit: async (name) => {
        if (name) {
          await window.electronAPI.createFolder(currentPath ? `${currentPath}/${name}` : name);
          loadFiles();
        }
      }
    });
  };

  const handleRename = async (item) => {
    if (!isElectron) return alert('Rename only works in Electron app!');
    setPromptValue(item.name);
    setPromptConfig({
      isOpen: true,
      title: 'Enter new name:',
      onSubmit: async (newName) => {
        if (newName && newName !== item.name) {
          const oldPath = item.path;
          const newPath = currentPath ? `${currentPath}/${newName}` : newName;
          await window.electronAPI.renameItem(oldPath, newPath);
          loadFiles();
        }
      }
    });
  };

  const handleUpload = async (e) => {
    if (!isElectron) return alert('Upload only works in Electron app!');
    const fileList = e.target.files;
    if (fileList.length > 0) {
      setIsUploading(true);
      for (const file of fileList) {
        const path = file.path;
        if (path) {
          await window.electronAPI.uploadFile(path, currentPath ? `${currentPath}/${file.name}` : file.name);
        }
      }
      setIsUploading(false);
      loadFiles();
    }
  };

  const handleDownload = async (item) => {
    if (!isElectron) return alert('Download only works in Electron app!');
    if (!window.electronAPI.downloadFile) {
      alert('Please restart the application (close and reopen). The backend needs to reload to apply the new download feature.');
      return;
    }
    try {
      const result = await window.electronAPI.downloadFile(item.path, item.name);
      if (result && result.error) {
        console.error('Download error:', result.error);
        alert('Failed to download: ' + result.error);
      }
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  const handlePreview = async (item) => {
    if (!isElectron) return window.electronAPI?.openFile(item.path);
    const ext = item.name.split('.').pop().toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'pdf'].includes(ext)) {
      const data = await window.electronAPI.getFileData(item.path);
      setPreviewData(data);
      setPreviewItem(item);
    } else {
      window.electronAPI.openFile(item.path);
    }
  };

  const filteredFiles = files.filter(f =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={cn("flex h-screen w-full transition-colors duration-300", darkMode ? "dark bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900")}>
      <div className="title-bar" />

      <Sidebar 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        currentPath={currentPath} 
        setCurrentPath={setCurrentPath} 
        storageInfo={storageInfo} 
      />

      <main className="flex-1 flex flex-col overflow-hidden">
        {!isElectron && (
          <div className="bg-amber-500/10 border-b border-amber-500/20 px-8 py-3 flex flex-col items-center justify-center space-y-1 text-amber-600 dark:text-amber-400 text-sm">
            <div className="flex items-center space-x-2 font-bold uppercase tracking-wide">
              <span>⚠️ Browser Mode Active</span>
            </div>
            <p>File operations are disabled in Chrome. Please close this tab and run <code className="bg-amber-500/20 px-1.5 py-0.5 rounded">npm run dev</code> to open the Desktop App.</p>
          </div>
        )}
        
        <Header 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleUpload={handleUpload}
          handleCreateFolder={handleCreateFolder}
        />

        <Breadcrumbs 
          currentPath={currentPath}
          setCurrentPath={setCurrentPath}
          handleBack={handleBack}
        />

        <div className="flex-1 overflow-y-auto px-8 pb-8">
          <FileGrid 
            filteredFiles={filteredFiles}
            handleFolderClick={handleFolderClick}
            handlePreview={handlePreview}
            handleDownload={handleDownload}
            handleRename={handleRename}
            handleDelete={handleDelete}
          />
        </div>
      </main>

      <PreviewModal 
        previewItem={previewItem}
        previewData={previewData}
        setPreviewItem={setPreviewItem}
        setPreviewData={setPreviewData}
      />

      {isUploading && (
        <div className="fixed bottom-8 right-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-4 flex items-center space-x-4 animate-in slide-in-from-bottom-4">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <div>
            <p className="text-sm font-bold">Uploading files...</p>
            <p className="text-xs text-slate-400">Please do not close the application</p>
          </div>
        </div>
      )}

      <PromptModal 
        promptConfig={promptConfig}
        setPromptConfig={setPromptConfig}
        promptValue={promptValue}
        setPromptValue={setPromptValue}
      />
    </div>
  );
}
