import express from 'express';
import 'express-async-errors';
import errorMiddlewares from './middlewares/errors';
import CarsRouter from './routers/Cars';

const app = express();

app.use(express.json());

app.use('/cars', CarsRouter);
app.use(errorMiddlewares);

export default app;
