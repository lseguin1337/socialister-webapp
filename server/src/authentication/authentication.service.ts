import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { config } from 'src/config';
import { User } from 'src/users/user.entity';
import { UsersService } from '../users/users.service';
import { TokenPayload } from './tokenPayload.interface';

@Injectable()
export class AuthenticationService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.getByUsername(username);

    if (user.password !== User.hashPassword(user.salt, password)) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async refreshToken(user: User) {
    const payload: TokenPayload = { username: user.username, userId: user.id };
    const refresh_token = this.jwtService.sign(payload, { 
      secret: config.jwt.refreshSecret,
      expiresIn: `${config.jwt.refreshExpirationTime}s`,
    });

    return {
      refresh_token,
    };
  }

  async accessToken(user: User) {
    const payload: TokenPayload = { username: user.username, userId: user.id };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
    };
  }
}
