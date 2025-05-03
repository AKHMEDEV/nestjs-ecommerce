import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, _: any, next: (error?: any) => void) {
    console.log(req.method, req.url);

    next();
  }
}
