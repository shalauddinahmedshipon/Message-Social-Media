import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join((process.cwd(), '.env')),
});

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_solt: process.env.BCRYPT_SOLT,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_expireIn: process.env.JWT_ACCESS_EXPIRES_IN,
};
