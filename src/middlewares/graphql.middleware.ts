import { Logger } from '@nestjs/common';
import axios from 'axios';
import { HEADERS } from '../common/types';

const logger = new Logger('GraphqlMiddleware');

export const GraphQLMiddleware = async props => {
  const req = props.connection?.context ? props.connection.context : props.req;
  const header = req.headers || req;
  const session = header[HEADERS.SESSION];

  if (!session) {
    logger.debug(`Session is invalid`);
    return { undefined };
  }
  try {
    const sessionInfo = (
      await axios.get(`http://localhost/api/session`, {
        headers: { 'x-session': session },
      })
    ).data;

    if (!sessionInfo) {
      logger.debug('Session is invalid');
      return undefined;
    }

    if (sessionInfo.status === 'expired') {
      logger.debug('Session expired');
      return undefined;
    }
    return { session: sessionInfo };
  } catch (error) {
    logger.error(error);
  }
};
