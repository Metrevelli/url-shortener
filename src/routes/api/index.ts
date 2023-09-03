import express, { Router, Request, Response, NextFunction } from 'express';
import { MinifyData, MinifyDataResponse } from '../../types/minify';
import { MinifyDataCodec } from '../../types/minify.codecs';
import Minify from '../../services/minify';
import { bodyValidator } from '../../middlewares/runtimeTypeCheckingMiddlewares';
import MinifyException from '../../exceptions/minifyException';
const router: Router = express.Router();

router.post(
  '/',
  bodyValidator(MinifyDataCodec),
  async (req: Request, res: Response) => {
    // throw new MinifyException()
    // try {
    console.log('asdf');
    let minifyData: MinifyData = req.body;
    // res.end();
    // throw new Error('asdf');
    // return MinifyException();
    // return;
    // throw new Error(';asdff');
    const result: MinifyDataResponse = await Minify.minify(minifyData);
    console.log('index.ts last res.send invoked');
    res.send(result);
    // } catch (err) {
    //   next(err);
    // }
  }
);

export default router;
