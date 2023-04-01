import { Injectable, Logger } from '@nestjs/common';
import { createCipheriv, createDecipheriv } from 'crypto';

@Injectable()
export class CommonService {
  constructor() {}

  private readonly logger = new Logger(CommonService.name);

  decrypt(textToDecrypt: string): string {
    try {
      const mykey = createDecipheriv(
        'aes-128-cbc',
        'my+very+long+password+1200',
        '0123456789123456',
      );
      let decrypted = mykey.update(textToDecrypt, 'hex', 'utf8');
      decrypted += mykey.final('utf8');
      return decrypted;
    } catch (error) {
      this.logger.error(error);
    }
  }

  encrypt(textToEncrypt: string): string {
    try {
      const mykey = createCipheriv(
        'aes-128-cbc',
        'my+very+long+password+1200',
        '0123456789123456',
      );
      let encrypted = mykey.update(textToEncrypt, 'utf8', 'hex');
      encrypted += mykey.final('hex');
      return encrypted;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
