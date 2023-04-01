import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from './auth.service';
import { Cron } from '@nestjs/schedule';
import { User, UserDocument } from 'src/models/user.model';
import { CreateUserArgs } from 'src/common/argsTypes';
import { SessionService } from './session.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly sessionService: SessionService,
  ) {}

  private readonly logger = new Logger(UserService.name);

  async createUser(user: CreateUserArgs) {
    try {
      const userExists = await this.userModel.findOne({ email: user.email });
      if (userExists) {
        throw new Error('User Already Exists!!');
      }
      const newUser = await this.userModel.create(user);
      return newUser;
    } catch (error) {
      this.logger.error(error);
      return error;
    }
  }

  async userLogin(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user || user.password !== password) return UnauthorizedException;
    return this.sessionService.createNewSession(email);
  }
}
