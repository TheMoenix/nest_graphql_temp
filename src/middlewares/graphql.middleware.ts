import axios from 'axios';
import { HEADERS } from '../common/types';

export const GraphQLMiddleware = async props => {
  const req = props.connection?.context ? props.connection.context : props.req;
  // logDebug(JSON.stringify(req));
  const header = req.headers || req;
  const session = header[HEADERS.SESSION];

  try {
    if (!session) {
      console.log(`Session is invalid`);
      return undefined;
    }
    const user = {
      id: session.uid,
      name: session.name,
      email: session.username,
    };
    return {
      user,
    };
  } catch (e) {
    console.log(e);
    return undefined;
  }
};
