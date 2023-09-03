import Url from '../models/url';
import IUrl from '../types/url';
import { Response } from 'express';
import nodeCache from 'node-cache';
const myCache = new nodeCache({ stdTTL: 10000, checkperiod: 0 });

export default class Redirection {
  private static readonly defaultRedirectUrl = 'youtube.com';

  public static async redirectToOriginalUrl(
    shortId: string,
    res: Response
  ): Promise<void> {
    let url: IUrl | null | undefined = await Url.findOne({
      shortId
    });

    if (url && !myCache.has(shortId)) {
      myCache.set(shortId, url);
      url = myCache.get(shortId);
    }

    res.redirect(this.getRedirectUrl(url));
  }

  private static getRedirectUrl(url: IUrl | null | undefined): string {
    return url?.ogUrl ?? this.defaultRedirectUrl;
  }
}
