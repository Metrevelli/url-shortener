import express, { Application } from 'express';
import index from '../routes/api/index';
import getUrl from '../routes/web/getUrl';
import ExHandler from 'express-custom-error-manager';

export default function (app: Application) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/api/minify', index);
  app.use('/mnfy', getUrl);

  app.use(ExHandler.middleware());
}
