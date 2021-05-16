import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private users: UsersService,
  ) {}
  
  @Post()
  create(@Body() payload: any) {
    return this.users.create(payload);
  }
}
