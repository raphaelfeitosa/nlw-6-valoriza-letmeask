import auth from '@config/auth';
import { sign } from 'jsonwebtoken';

export function jwtoken(id: string) {
  return sign({}, auth.secret_token, {
    subject: id,
    expiresIn: auth.expires_in_token,
  });
};
