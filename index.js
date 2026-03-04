import dotenv from 'dotenv/config';
import express from 'express';
import './config/connection.js';

import passport from './config/passport.js';
import { authentication } from './middlewares/auth.js';
import errorHandler from './middlewares/errorHandler.js';
import routes from './routes/index.js';

// dotenv.config();

const app = express();

app.use(express.json());
app.use(passport.initialize());
app.use('/', routes);
app.use(errorHandler);
app.use((err, req, res, next) => {
    console.error('An error occurred:', err);
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({ error: message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

export default app;