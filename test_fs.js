const fs = require('fs');
const path = require('path');
const os = require('os');

const homeDir = os.homedir();
const DRIVE_PATH = path.join(homeDir, 'MyPersonalDriveData');

console.log('Home Dir:', homeDir);
console.log('DRIVE_PATH:', DRIVE_PATH);

if (!fs.existsSync(DRIVE_PATH)) {
    console.log('Creating drive path...');
    fs.mkdirSync(DRIVE_PATH, { recursive: true });
}

// Simulate the logic from main.js
async function testCreateFolder(folderPath) {
    const fullPath = path.join(DRIVE_PATH, folderPath);
    console.log(`Attempting to create: ${fullPath} (Input: ${folderPath})`);
    try {
        await fs.promises.mkdir(fullPath, { recursive: true });
        console.log('Success!');
    } catch (err) {
        console.error('Error:', err.message);
    }
}

// Test cases
(async () => {
    // 1. Simple folder
    await testCreateFolder('test_folder_1');
    
    // 2. Nested with mixed slashes (mimicking App.jsx)
    // Assuming 'test_folder_1' exists, we add 'subfolder' inside it.
    // If currentPath was 'test_folder_1' (from windows path), and we join with '/'
    await testCreateFolder('test_folder_1\\test_subfolder/mixed_slashes');
    
})();
