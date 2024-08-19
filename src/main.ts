import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import "reflect-metadata";
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true
    }
  }));

  const config = new DocumentBuilder()
    .setTitle('Multitenancy Postgres Example')
    .setDescription(`
        This API is a demonstration of a multitenancy application using PostgreSQL as the database.
        It allows multiple tenants to share the same application instance, with each tenant's data isolated from others.
      `)
    .setVersion('1.0')
    .addTag('Users')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();
