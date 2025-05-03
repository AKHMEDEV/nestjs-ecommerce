import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  CategoryModule,
  OrderModule,
  ProductModule,
  UserModule,
} from './modules';
import { HttpExceptionFilter } from './filter';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { loggingIntercepter } from './interceptors/logging.intersapter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CategoryModule,
    ProductModule,
    UserModule,
    OrderModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: loggingIntercepter,
    },
  ],
})
export class AppModule {}
