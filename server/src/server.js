// server.js
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cityRouter from './routes/cityRoutes.js';

const app = express();
const PORT = 8080;

// Use CORS middleware
app.use(cors());
// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use('/cities', cityRouter);

app.listen(PORT, () => {
	console.log(`Express server is running on port ${PORT}`);
});
