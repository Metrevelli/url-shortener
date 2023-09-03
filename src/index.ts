import express, { Application } from 'express';
import './startup/dotenv';
const app: Application = express();

import ErrManager from 'express-custom-error-manager';
app.use(ErrManager.register());

import db from './startup/db';
db();

import routes from './startup/routes';
routes(app);

const PORT: number | string = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
