import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
const PORT = 3001;


app.use(express.static(path.join(__dirname, 'content')));

app.get('/api/files', async (req, res) => {
    const contentDir = path.resolve(__dirname, '..', 'content');
    fs.readdir(contentDir, async (err, files) => {
        if (err) {
            return res.status(500).send('Error reading directory');
        }

        try {
            const fileContents = await Promise.all(files.map(file => {
                return fs.promises.readFile(path.join(contentDir, file), 'utf8');
            }));
            const fileData = files.map((file, index) => ({
                name: file,
                content: fileContents[index]
            }));
            res.json(fileData);
        } catch (readErr) {
            res.status(500).send('Error reading files');
        }
    });
});


app.get('/test', (req, res) => {
    res.send(path.join(__dirname, 'content'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
