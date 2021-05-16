import { ClassSerializerInterceptor, Controller, Get, HttpCode, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { RequestWithUser } from './requestWithUser.interface';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthenticationService } from './authentication.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { config } from 'src/config';
import { JwtRefreshGuard } from './jwt-refresh.guard';

@Controller('api/auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {
  constructor(
    private authService: AuthenticationService,
  ) {}

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async logIn(@Req() request: RequestWithUser) {
    const { refresh_token } = await this.authService.refreshToken(request.user);
    const { access_token } = await this.authService.accessToken(request.user);
    // add secure flag
    request.res.setHeader('Set-Cookie', [`Refresh=${refresh_token}; HttpOnly; Path=/api/auth/refresh; Max-Age=${config.jwt.refreshExpirationTime}`]);
    return { access_token };
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Req() request: RequestWithUser) {
    return request.user;
  }

  @HttpCode(200)
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refresh(@Req() request: RequestWithUser) {
    const { access_token } = await this.authService.accessToken(request.user);
    return { access_token };
  }
}
