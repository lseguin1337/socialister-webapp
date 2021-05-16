import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { config } from '../config';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtRefreshTokenStrategy } from './jwt-refresh.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: config.jwt.accessSecret,
      signOptions: { expiresIn: `${config.jwt.accessExpirationTime}s` },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    AuthenticationService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshTokenStrategy,
  ],
})
export class AuthenticationModule {}
