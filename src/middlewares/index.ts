import { NextFunction, Request, Response } from "express";
import { ExtendedError } from "src/interfaces/utils";

export function timeOutMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Set 1min timeout for all HTTP requests
  req.setTimeout(60000, () => {
    const err = new Error("Request Timeout") as ExtendedError;
    err.status = 408;
    next(err);
  });
  // Set 1min server response timeout for all HTTP requests
  res.setTimeout(60000, () => {
    res.statusCode = 408;
    res.send({
      code: 408,
      name: "REQUESTTIMEOUT",
      message: "Request has timed out"
    });
  });
  next();
}
