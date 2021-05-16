import { ClassSerializerInterceptor, Controller, HttpCode, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { RequestWithUser } from './requestWithUser.interface';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthenticationService } from './authentication.service';
import { JwtAuthGuard } from './jwt-auth.guard';

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
    return this.authService.login(request.user);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post('me')
  async me(@Req() request: RequestWithUser) {
    return request.user;
  }
}
