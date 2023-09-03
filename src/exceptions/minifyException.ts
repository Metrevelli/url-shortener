import Url from '../models/url';
import ExHandler from 'express-custom-error-manager';

const MinifyException = ExHandler.createException(
  'something went wrong inside Minify service',
  (data) => {
    console.log('minifyException: after throwing, in callback: ', data);
  },
  {
    httpStatus: 200
  }
);

export default MinifyException;
