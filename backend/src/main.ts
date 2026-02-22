import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://personal-website-finals.vercel.app'
    ],
    methods: ['GET', 'POST'],
    credentials: true,
  });
  
  await app.listen(3000);
  console.log('✅ Backend running on http://localhost:3000');
}
bootstrap();