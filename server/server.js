import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import chokidar from 'chokidar';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
const PORT = 3001;

const contentDir = path.resolve(__dirname, '..', 'content');

let fileCache = []; // In-memory cache of file contents

// Function to read and cache file contents
async function cacheFileContents() {
    try {
        const files = await fs.promises.readdir(contentDir);
        const fileContents = await Promise.all(files.map(file => {
            return fs.promises.readFile(path.join(contentDir, file), 'utf8');
        }));
        fileCache = files.map((file, index) => ({
            name: file,
            content: fileContents[index]
        }));
        console.log(fileContents);
    } catch (err) {
        console.error('Error caching file contents:', err);
    }
}

// Initial caching of file contents
cacheFileContents();

// Set up a watcher for .md files in the content directory
const watcher = chokidar.watch(contentDir, {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
    usePolling: true,
    interval: 100
});

// Reload the .md files when they change
watcher.on('all', (event,path) => {
    cacheFileContents(); // Update the in-memory cache
});

// API endpoint to fetch file contents
app.get('/api/files', (req, res) => {
    res.json(fileCache);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
