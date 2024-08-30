import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cors from 'cors';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.use(cors({
    origin: "https://inlaze-movies-client-maiky33s-projects.vercel.app", 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  })); 

  app.use(cookieParser());
  
  const port = process.env.PORT || 4000;
  await app.listen(port);
}
bootstrap();
