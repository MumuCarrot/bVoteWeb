import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import * as express from 'express';

function setOrigin() {
    if (process.env.NEXT_PUBLIC_DOMAIN && process.env.NEXT_PUBLIC_CLIENT_PORT)
        return process.env.NEXT_PUBLIC_DOMAIN + process.env.NEXT_PUBLIC_CLIENT_PORT;
    else
        return 'http://localhost:3000';
}

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors({
        origin: setOrigin(),
        credentials: true,
    });
    app.use(express.static(join(__dirname, '..', 'public')));
    await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
