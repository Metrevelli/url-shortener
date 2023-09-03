import * as t from 'io-ts';
import {
  MinifyData,
  MinifyDataWithoutOptions,
  MinifyDataWithOptions,
  MinifyDataOptions,
  MinifyDataResponse
} from './minify';

export const MinifyDataOptionsCodec: t.Type<MinifyDataOptions> = t.partial({
  password: t.string
});

export const MinifyDataWithoutOptionsCodec: t.Type<MinifyDataWithoutOptions> =
  t.type({
    url: t.string
  });

export const MinifyDataWithOptionsCodec: t.Type<MinifyDataWithOptions> =
  t.intersection([
    MinifyDataWithoutOptionsCodec,
    t.type({
      options: MinifyDataOptionsCodec
    })
  ]);

export const MinifyDataCodec: t.Type<MinifyData> = t.union([
  MinifyDataWithOptionsCodec,
  MinifyDataWithoutOptionsCodec
]);

export const MinifyDataResponseCodec: t.Type<MinifyDataResponse> = t.type({
  url: t.string
});
