import axios from 'axios';
import { HEADERS } from '../common/types';

export const GraphQLMiddleware = async props => {
  const req = props.connection?.context ? props.connection.context : props.req;
  const header = req.headers || req;
  const session = header[HEADERS.SESSION];
  if (!session) {
    console.log(`Session is invalid`);
    return undefined;
  }
  if (session === process.env.MOENIX_MASTER_SESSION_TOKEN) {
    return { session: {} };
  }
  const sessionInfo = (await axios.get(`http://localhost/session/${session}`))
    .data;
  if (!sessionInfo) {
    console.log(`Session is invalid`);
    return undefined;
  }

  const date = new Date();
  const lastActivityAt = new Date(sessionInfo.lastActivityAt);
  const diffHours = date.getHours() - lastActivityAt.getHours();
  if (sessionInfo.status === 'expied' || diffHours > 1) {
    console.log('Session expried');
    return undefined;
  }

  return { session: sessionInfo };
};
