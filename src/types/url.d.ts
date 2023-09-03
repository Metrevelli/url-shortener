import { MinifyDataOptions } from './minify';

export default interface Url {
  ogUrl: string;
  shortId: string;
  options?: MinifyDataOptions;
  expireAt?: Date;
}
