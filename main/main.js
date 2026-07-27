const { app, BrowserWindow, ipcMain, shell, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

let DRIVE_PATH;

function createWindow() {
    const isDev = !app.isPackaged;
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
        },
        titleBarStyle: 'hidden',
        backgroundColor: '#ffffff',
    });

    const startUrl = isDev
        ? 'http://localhost:5173'
        : `file://${path.join(__dirname, '../dist/index.html')}`;

    win.loadURL(startUrl);

    if (isDev) {
        win.webContents.openDevTools();
    }
}

app.on('ready', () => {
    DRIVE_PATH = path.join(app.getPath('home'), 'MyPersonalDriveData');

    if (!fs.existsSync(DRIVE_PATH)) {
        fs.mkdirSync(DRIVE_PATH, { recursive: true });
    }

    // Register Handlers
    ipcMain.handle('get-files', async (event, folderPath = '') => {
        const fullPath = path.join(DRIVE_PATH, folderPath);
        try {
            const items = await fs.promises.readdir(fullPath, { withFileTypes: true });
            return items.map(item => ({
                name: item.name,
                isDirectory: item.isDirectory(),
                size: item.isDirectory() ? 0 : fs.statSync(path.join(fullPath, item.name)).size,
                modified: fs.statSync(path.join(fullPath, item.name)).mtime,
                path: path.join(folderPath, item.name),
            }));
        } catch (err) {
            console.error(err);
            return [];
        }
    });

    ipcMain.handle('upload-file', async (event, sourcePath, targetPath) => {
        const dest = path.join(DRIVE_PATH, targetPath);
        try {
            await fs.promises.copyFile(sourcePath, dest);
            return { success: true };
        } catch (err) {
            return { success: false, error: err.message };
        }
    });

    ipcMain.handle('create-folder', async (event, folderPath) => {
        const fullPath = path.join(DRIVE_PATH, folderPath);
        try {
            await fs.promises.mkdir(fullPath, { recursive: true });
            return { success: true };
        } catch (err) {
            return { success: false, error: err.message };
        }
    });

    ipcMain.handle('delete-item', async (event, itemPath) => {
        const fullPath = path.join(DRIVE_PATH, itemPath);
        try {
            await fs.promises.rm(fullPath, { recursive: true });
            return { success: true };
        } catch (err) {
            return { success: false, error: err.message };
        }
    });

    ipcMain.handle('rename-item', async (event, oldPath, newPath) => {
        const fullOldPath = path.join(DRIVE_PATH, oldPath);
        const fullNewPath = path.join(DRIVE_PATH, newPath);
        try {
            await fs.promises.rename(fullOldPath, fullNewPath);
            return { success: true };
        } catch (err) {
            return { success: false, error: err.message };
        }
    });

    ipcMain.handle('get-storage-info', async () => {
        try {
            const getDirSize = async (dir) => {
                let size = 0;
                const items = await fs.promises.readdir(dir, { withFileTypes: true });
                for (const item of items) {
                    const itemPath = path.join(dir, item.name);
                    if (item.isDirectory()) {
                        size += await getDirSize(itemPath);
                    } else {
                        size += fs.statSync(itemPath).size;
                    }
                }
                return size;
            };

            const countFiles = async (dir) => {
                let count = 0;
                const items = await fs.promises.readdir(dir, { withFileTypes: true });
                for (const item of items) {
                    const itemPath = path.join(dir, item.name);
                    if (item.isDirectory()) {
                        count += await countFiles(itemPath);
                    } else {
                        count++;
                    }
                }
                return count;
            };

            const usedSize = await getDirSize(DRIVE_PATH);
            const fileCount = await countFiles(DRIVE_PATH);

            return {
                usedSize,
                fileCount,
                totalSize: 50 * 1024 * 1024 * 1024,
            };
        } catch (err) {
            return { usedSize: 0, fileCount: 0, totalSize: 0 };
        }
    });

    ipcMain.handle('open-file', async (event, itemPath) => {
        const fullPath = path.join(DRIVE_PATH, itemPath);
        shell.openPath(fullPath);
    });

    ipcMain.handle('download-file', async (event, itemPath, defaultName) => {
        const sourcePath = path.join(DRIVE_PATH, itemPath);
        try {
            const win = BrowserWindow.fromWebContents(event.sender);
            const { filePath } = await dialog.showSaveDialog(win, {
                defaultPath: defaultName,
                title: 'Download File'
            });
            if (filePath) {
                await fs.promises.copyFile(sourcePath, filePath);
                return { success: true };
            }
            return { success: false, canceled: true };
        } catch (err) {
            return { success: false, error: err.message };
        }
    });

    ipcMain.handle('get-file-data', async (event, itemPath) => {
        const fullPath = path.join(DRIVE_PATH, itemPath);
        try {
            const buffer = await fs.promises.readFile(fullPath);
            return buffer.toString('base64');
        } catch (err) {
            return null;
        }
    });

    createWindow();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
