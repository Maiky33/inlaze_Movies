import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.use(cors({
    origin: "*", 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  })); 

  app.use(cookieParser());
  
  const port = process.env.PORT || 4000;
  await app.listen(port);
}
bootstrap();
