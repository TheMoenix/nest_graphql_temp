import { Controller, Get, Param } from '@nestjs/common';

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

  @Get('/get-session/:id')
  async getUserBySession(@Param('id') id: string) {
    return await this.sessionService.getUserBySession(id);
  }
}
