import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Session, SessionDocument } from 'src/models/session.model';
import { Cron } from '@nestjs/schedule';
import { User, UserDocument } from 'src/models/user.model';

@Injectable()
export class SessionService {
  constructor(
    @InjectModel(Session.name) private sessionModel: Model<SessionDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  private readonly logger = new Logger(SessionService.name);

  async createNewSession(user_email: string) {
    try {
      const user = await this.userModel.findOne({ email: user_email });
      const userSession = await this.doesHaveActiveSesstion(user);
      if (userSession) {
        return userSession;
      }
      const new_session = await this.sessionModel.create({
        user: user.id,
        lastActivityAt: new Date(),
      });
      return new_session;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async doesHaveActiveSesstion(user) {
    const session = await this.sessionModel.findOne({
      user: user.id,
      status: 'active',
    });
    return session;
  }

  @Cron('* * * * * *')
  async checkSessionExpiry() {
    const oneHour = 1000 * 60 * 60;
    const activeSessions = await this.sessionModel.find({ status: 'active' });
    const date = new Date();
    for (let i = 0; i < activeSessions.length; i++) {
      const session = activeSessions[i];
      if (
        date.getTime() - new Date(session.lastActivityAt).getTime() >
        oneHour
      ) {
        await this.sessionModel.updateOne(
          { _id: session._id },
          { status: 'expired' },
        );
        this.logger.debug(`session ${session._id} expired`);
      }
    }
  }

  async getSessionInfo(sessionId: string) {
    try {
      const session = await this.sessionModel
        .findOne({ _id: sessionId })
        .populate({
          path: 'user',
          populate: {
            model: this.userModel,
            path: 'user',
          },
        });
      return session;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async updateLastActivityAt(sessionId: string) {
    try {
      await this.sessionModel.updateOne(
        { _id: sessionId },
        { lastActivityAt: new Date() },
      );
    } catch (error) {
      this.logger.error(error);
    }
  }
}
