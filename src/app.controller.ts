import { Controller, Get, Param, Headers, Post } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';

import { AppService } from './app.service';
import { SessionService } from './services/session.service';
import { UserService } from './services/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly sessionService: SessionService,
    private readonly userService: UserService,
  ) {}

  @Get('/healthcheck')
  healthcheck(): string {
    console.log(`${process.env.MOENIX_DEPLOYMENT_NAME} is healthy`);
    return this.appService.getHealthcheck();
  }

  @Get('/session/:id')
  async getUserBySession(
    @Param('id') id: string,
    @Headers('isActivity') isActivity: boolean,
  ) {
    if (isActivity) await this.sessionService.updateLastActivityAt(id);
    return await this.sessionService.getSessionInfo(id);
  }

  @Post('/login')
  async userLogin(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.userService.userLogin(email, password);
  }

  @Post('/user')
  async createUser(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('username') username: string,
    @Body('name') name: string,
  ) {
    return this.userService.createUser({ email, password, username, name });
  }
}
