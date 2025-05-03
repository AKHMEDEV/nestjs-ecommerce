import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, _: any, next: (error?: any) => void) {
    console.log(req.method, req.url);

    next();
  }
}
