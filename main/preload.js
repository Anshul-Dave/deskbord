const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    getFiles: (folderPath) => ipcRenderer.invoke('get-files', folderPath),
    uploadFile: (sourcePath, targetPath) => ipcRenderer.invoke('upload-file', sourcePath, targetPath),
    createFolder: (folderPath) => ipcRenderer.invoke('create-folder', folderPath),
    deleteItem: (itemPath) => ipcRenderer.invoke('delete-item', itemPath),
    renameItem: (oldPath, newPath) => ipcRenderer.invoke('rename-item', oldPath, newPath),
    getStorageInfo: () => ipcRenderer.invoke('get-storage-info'),
    openFile: (itemPath) => ipcRenderer.invoke('open-file', itemPath),
    getFileData: (itemPath) => ipcRenderer.invoke('get-file-data', itemPath),
    downloadFile: (itemPath, defaultName) => ipcRenderer.invoke('download-file', itemPath, defaultName),
});
