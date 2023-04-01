import { Logger, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SessionService } from './services/session.service';
import { ConfigModule } from '@nestjs/config';
import { GraphQLMiddleware } from './middlewares/graphql.middleware';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { MutationResolver } from './resolvers/mutation.resolver';
import { QueryResolver } from './resolvers/query.resolver';
import { User, UserSchema } from './models/user.model';
import { Session, SessionSchema } from './models/session.model';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(
      process.env.MOENIX_MONGO_URI || 'mongodb://test:test@mongo:27017',
      {
        authSource: 'admin',
        dbName: 'moenix',
      },
    ),
    GraphQLModule.forRoot({
      debug: true,
      autoSchemaFile: true,
      sortSchema: true,
      installSubscriptionHandlers: true,
      context: GraphQLMiddleware,
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    SessionService,
    UserService,
    AuthService,
    Logger,
    QueryResolver,
    MutationResolver,
  ],
})
export class AppModule {}
