import dotenv from 'dotenv/config';
import express from 'express';
import './config/connection.js';
// import mongo from './config/connection.js';
import productRouter from './controllers/controller.js';


// dotenv.config();

const app = express();

app.use(express.json());
app.use('/', productRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

export default app;