import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Update CORS to allow your frontend
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://personal-website-finals-kgrl.vercel.app',  // frontend URL
      'https://personal-website-finals-ivory.vercel.app'   // backend URL
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  
  await app.listen(3000);
  console.log('✅ Backend running on http://localhost:3000');
}
bootstrap();