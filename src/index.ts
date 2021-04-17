import 'module-alias/register';
import express, { Express, Request, Response } from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cors from 'cors';
import './config/database';
import './global-types';
import IndexController from './modules/IndexController';
import accountRoutes from './modules/account/routes';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();

app.use(helmet());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Register routes
app.use('/account', accountRoutes);

app.all('/', IndexController.index);
app.all('*', IndexController.pageNotFound);

app.use((err:any, req: Request, res: Response, next: any) => {
  const response = {
    status: 'failed',
    data: null,
    message: err.message,
  };
  res.status(500).send(response);
  console.error(err.stack);
});

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));
