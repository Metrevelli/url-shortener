import * as t from 'io-ts';
import { GetOgUrl } from './getOgUrl';

export const GetOgUrlCodec: t.Type<GetOgUrl> = t.type({
  shortId: t.string
});
