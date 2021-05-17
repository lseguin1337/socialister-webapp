import { Body, Controller, Get, HttpCode, Post, Req } from '@nestjs/common';
import { RequestWithUser } from 'src/auth/requestWithUser.interface';
import { UsersService } from './users.service';

@Controller('/api/users')
export class UsersController {
  constructor(
    private users: UsersService,
  ) {}
  
  @Post()
  create(@Body() payload: any) {
    return this.users.create(payload);
  }

  @HttpCode(200)
  @Get('me')
  me(@Req() request: RequestWithUser) {
    console.log('access_secret', process.env.ACCESS_SECRET);
    return request.user;
  }
}
