import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { IApplicationInitializer } from './initializers/application.initializer';
import { DatabaseInitializer } from './initializers/database.initializer';
import { ConfigService } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';
import { SessionInitializer } from './initializers/session.initializer';

const initializers: IApplicationInitializer[] = [
  new DatabaseInitializer(),
  new SessionInitializer(),
];

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  const config = new DocumentBuilder()
    .setTitle('User Management System')
    .setDescription('REST API Documentation')
    .setVersion('2.0.0')
    .addTag('Nataha API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v2/docs', app, document);

  for (const initializer of initializers) {
    await initializer.initialize(app, configService);
  }

  await app.listen(3000, () => {
    console.log('Listening on port 3000!');
  });
}
bootstrap();
