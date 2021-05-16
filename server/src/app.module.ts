import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { migrations } from './migrations';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [() => config],
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'frontend/dist'),
    }),
    TypeOrmModule.forRoot({
      ...config.database,
      migrations,
      migrationsRun: true,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
