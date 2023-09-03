import { MinifyData, MinifyDataResponse } from '../types/minify';
import Url from '../models/url';
import IUrl from '../types/url';
import { Response } from 'express';
import Shortener from './urlShortener';
import Redirection from './redirection';
import MinifyException from '../exceptions/minifyException';

const MINIFY_OPTIONS_PROPERTY = 'options';

export default class Minify {
  static async minify(minifyData: MinifyData): Promise<MinifyDataResponse> {
    const sUrl = await Shortener.getUniqueShortenedUrl();

    const data: IUrl = {
      ogUrl: minifyData.url,
      shortId: sUrl.shortId,
      options:
        MINIFY_OPTIONS_PROPERTY in minifyData
          ? minifyData[MINIFY_OPTIONS_PROPERTY]
          : {}
    };

    const url = new Url(data);
    await url.save();

    return { url: sUrl.url };
  }

  static async getUrl(shortId: string, res: Response): Promise<void> {
    await Redirection.redirectToOriginalUrl(shortId, res);
  }

  private setOptions(): void {
    // set options on minified url
  }
}
