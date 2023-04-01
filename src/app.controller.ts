import { Controller, Get, Param, Headers, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { SessionService } from './services/session.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly sessionService: SessionService,
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

  // @Post('/session')
  // async createSession(@Param('id') id: string) {
  //   return await this.sessionService.createNewSession();
  // }
}
