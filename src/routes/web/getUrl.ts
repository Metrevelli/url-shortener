import express, { Router, Request, Response } from 'express';
import Minify from '../../services/minify';
import { GetOgUrl } from '../../types/getOgUrl';
import { GetOgUrlCodec } from '../../types/getOgUrl.codecs';
import { paramsValidator } from '../../middlewares/runtimeTypeCheckingMiddlewares';
import apiRateLimit from '../../middlewares/rateLimitMiddleware';
const router: Router = express.Router();

router.get(
  '/:shortId',
  [paramsValidator(GetOgUrlCodec)],
  async (req: Request, res: Response) => {
    //we do this to clone object req.params so it wont be ParamsDictionary type anymore
    const ogUrl: GetOgUrl = { shortId: req.params.shortId };
    // res.send('asfff');
    return await Minify.getUrl(ogUrl.shortId, res);
  }
);

export default router;
