'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const core_1 = require('@nestjs/core');
const app_module_1 = require('./app.module');
const swagger_1 = require('@nestjs/swagger');
const cookieParser = require('cookie-parser');
async function bootstrap() {
  const app = await core_1.NestFactory.create(app_module_1.AppModule);
  const config = new swagger_1.DocumentBuilder()
    .setTitle('EWorkbook API')
    .setDescription('Click Try it out to see the API in action')
    .setVersion('1.0')
    .build();
  app.use(cookieParser());
  app.enableCors({
    origin: [
      //   'http://localhost:3000',
      //   'http://157.245.199.88:3000',
      //   'http://localhost:8000',
      //   'http://157.245.199.88:8000',
      //   'http://student.dev.eworkbook.me',
      //   'https://student.dev.eworkbook.me',
      //   'http://teacher.dev.eworkbook.me',
      //   'https://teacher.dev.eworkbook.me',
      //   'https://student.eworkbook.me',
      //   'https://teacher.eworkbook.me',
      //   'https://main.d1rlk4399pr735.amplifyapp.com',
    ],
    origin: '*',
    // credentials: true,
  });
  const customOptions = {
    swaggerOptions: {
      withCredentials: true,
    },
  };
  const document = swagger_1.SwaggerModule.createDocument(app, config);
  swagger_1.SwaggerModule.setup('api', app, document, customOptions);
  const port = process.env.PORT || 5000;
  await app.listen(port, () => console.log(`Server running on port ${port}`));
}
bootstrap();
//# sourceMappingURL=main.js.map
