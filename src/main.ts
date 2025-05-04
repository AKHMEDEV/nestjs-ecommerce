import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './middleware';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(new LoggerMiddleware().use);

app.useGlobalPipes(
  new ValidationPipe({
    forbidNonWhitelisted: true,
    whitelist: true,
    exceptionFactory(errors) {
      let errorMsg = '';
      errors.forEach((err) => {
        if (err.constraints) {
          errorMsg += `${Object.values(err.constraints).join(', ')}, `;
        }
      });
      throw new BadRequestException(errorMsg);
    }
    
  }),
);


  const port = process.env.APP_PORT ? Number(process.env.APP_PORT) : 3000;
  await app.listen(port, () => {
    console.log(`server started on port  ${port}✅`);
  });
}
bootstrap();
