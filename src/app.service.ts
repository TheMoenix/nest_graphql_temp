import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  getHealthcheck(): string {
    return `${process.env.MOENIX_DEPLOYMENT_NAME} is healthy`;
  }

  someOtherService() {
    return true;
  }
}
