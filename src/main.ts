import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  var whitelist = ['http://localhost:3000'];

  const app = await NestFactory.create(AppModule);

      

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:4200',
      'http://example.com',
      'http://www.example.com',
      'http://app.example.com',
      'https://example.com',
      'https://www.example.com',
      'https://app.example.com',
      'localhost:4200',
      'localhost:3000',
      '*'
    ],
    methods: ["GET", "POST", "OPTIONS", "*"],
    credentials: true,
  });
    
    await app.listen(3000);
}
bootstrap();
