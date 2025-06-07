import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
    imports: [
        DatabaseModule,
        UserModule,
        ConfigModule.forRoot({isGlobal: true}),
    ],
})
export class AppModule {}
