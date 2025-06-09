import { Module } from '@nestjs/common';
import { RenderModule } from 'nest-next';
import Next from 'next';
import { resolve } from 'path';

import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { AppController } from './app.contoller';

@Module({
    imports: [
        DatabaseModule,
        UserModule,
        RenderModule.forRootAsync(
            Next({
                dev: process.env.NODE_ENV !== 'production',
                dir: resolve(__dirname, '..'),
            }),
            { viewsDir: null }
        ),
    ],
    controllers: [AppController],
})
export class AppModule {}

