import { Request, Response, NextFunction } from 'express';

export function routeAliases(request: Request, _: Response, next: NextFunction) {
  const { protocol, hostname, originalUrl } = request;
  const hostUrl = `${protocol}://${hostname}:${process.env.PORT}`;
  request.hostUrl = hostUrl;
  request.currentUrl = `${hostUrl + originalUrl.split('?').shift()}`;
  next();
};
