import {
  Controller,
  Get,
  Body,
  Post,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard)
  @Get('/me')
  async me(@Headers('user') user: unknown) {
    return user;
  }

  @Post('/login')
  async login(@Body() props: unknown) {
    return await this.authService.login(props);
  }

  @Post('/signin')
  async signin(@Body() props: unknown) {
    return await this.authService.signin(props);
  }
}
