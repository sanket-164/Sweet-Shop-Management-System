import express from 'express';
import cors from 'cors';
import createHttpError from 'http-errors';

const app = express();

import { errorHandler } from './middleware/errorHandler';

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use((req, res, next) => {
    next(createHttpError(404, req.url + " URL not found"));
});

app.use(errorHandler);

export default app;