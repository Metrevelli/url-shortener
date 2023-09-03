import * as t from 'io-ts';
import { isLeft } from 'fp-ts/Either';
import { PathReporter } from 'io-ts/lib/PathReporter';
import { Request, Response, NextFunction } from 'express';
type DecodeFunction<T> = (req: Request) => t.Validation<T>;

function createRuntimeValidator<T>(decodeFn: DecodeFunction<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const decoded = decodeFn(req);
    //`isLeft(decoded)` is a function that checks if the result of decoding is on the "left" side of a discriminated union.
    //In io-ts, the Either type is used for validation results, where
    //the "left" side typically represents a validation error, and the "right" side represents a successful value.

    //If isLeft(decoded) returns true, it means
    //that the decoding process resulted in a validation error
    if (isLeft(decoded)) {
      const error = console.log(PathReporter.report(decoded)[0]);
      return res.status(400).send(`Validation errror: ${error}`);
    }

    next();
  };
}

function assignDecoded<T>(ob: any, decoded: t.Validation<T>): void {
  // ob = !isLeft(decoded) ? decoded.right : {};
  // this line is more performant because it doesnt requre creating new object {}
  // when decoded is left which can help to reduce unnecessary memory allocation
  Object.assign(ob, !isLeft(decoded) ? decoded.right : {});
}

export const bodyValidator = <T>(type: t.Type<T>) => {
  return createRuntimeValidator((req) => {
    const decoded = type.decode(req.body);
    assignDecoded(req.body, decoded);
    return decoded;
  });
};

export const paramsValidator = <T>(type: t.Type<T>) => {
  return createRuntimeValidator((req) => {
    const decoded = type.decode(req.params);
    assignDecoded(req.params, decoded);
    return decoded;
  });
};
