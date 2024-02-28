import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('EWorkbook API')
    .setDescription('Click Try it out to see the API in action')
    .setVersion('1.0')
    .build();
  app.use(cookieParser());
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://157.245.199.88:3000',
      'http://localhost:8000',
      'http://157.245.199.88:8000',
      'http://student.dev.eworkbook.me',
      'https://student.dev.eworkbook.me',
      'http://teacher.dev.eworkbook.me',
      'https://teacher.dev.eworkbook.me',
      'https://student.eworkbook.me',
      'https://teacher.eworkbook.me',
      'http://main.d1rlk4399pr735.amplifyapp.com',
    ],
    credentials: true,
  });
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      withCredentials: true,
    },
  };

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, customOptions);
  const port = process.env.PORT || 5000;
  await app.listen(port, () => console.log(`Server running on port ${port}`));
}
bootstrap();
