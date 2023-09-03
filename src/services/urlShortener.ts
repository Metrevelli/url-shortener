import shortId from 'shortid';
import Url from '../models/url';
import IUrl from '../types/url';

export default class Shortener {
  private static readonly mnfyUrl: string = process.env.MNFY_URL ?? '';

  public static async getUniqueShortenedUrl(): Promise<{
    url: string;
    shortId: string;
  }> {
    const randomShortId = await this.generateRandomShortId();

    return { url: `${this.mnfyUrl}/${randomShortId}`, shortId: randomShortId };
  }

  private static async generateRandomShortId(): Promise<string> {
    const randomShortId: string = shortId.generate();

    if (await this.shortIdExists(randomShortId)) {
      return this.generateRandomShortId();
    }

    return randomShortId;
  }

  private static async shortIdExists(shortId: string): Promise<IUrl | null> {
    return Url.findOne({
      shortId
    });
  }
}
