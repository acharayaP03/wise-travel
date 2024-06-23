// server.js
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8080;

// Use CORS middleware
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());

// Route to get cities data
app.get('/cities', (req, res) => {
	const citiesPath = path.join(__dirname, 'data', 'cities.json');
	fs.readFile(citiesPath, 'utf-8', (err, data) => {
		if (err) {
			res.status(500).json({ error: 'Failed to read cities data' });
		} else {
			res.json(JSON.parse(data));
		}
	});
});

app.listen(PORT, () => {
	console.log(`Express server is running on port ${PORT}`);
});
