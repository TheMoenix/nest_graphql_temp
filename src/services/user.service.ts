import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from './auth.service';
import { Cron } from '@nestjs/schedule';
import { User, UserDocument } from 'src/models/user.model';
import { CreateUserArgs } from 'src/common/argsTypes';

@Injectable()
export class UserService {
  constructor(
    private auth: AuthService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async createUser(user: CreateUserArgs) {
    try {
      console.log('test');

      console.log(this.auth.session);

      const userExists = await this.userModel.findOne({ email: user.email });
      if (userExists) {
        throw new Error('User Already Exists!!');
      }
      const newUser = await this.userModel.create(user);
      console.log(newUser);
      return newUser;
    } catch (error) {
      return error;
    }
  }
}
