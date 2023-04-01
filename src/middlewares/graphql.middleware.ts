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
    return undefined;
  }
  try {
    const sessionInfo = (await axios.get(`http://localhost/session/${session}`))
      .data;
    if (!sessionInfo) {
      logger.debug('Session is invalid');
      return undefined;
    }

    const date = new Date();
    const lastActivityAt = new Date(sessionInfo.lastActivityAt);
    const diffHours = date.getHours() - lastActivityAt.getHours();
    if (sessionInfo.status === 'expried' || diffHours > 1) {
      logger.debug('Session expried');
      return undefined;
    }
    return { session: sessionInfo };
  } catch (error) {
    logger.error(error);
  }
};
