import * as bcrypt from 'bcrypt';

// there is more than one place need to hash password (register, change password)
export default function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}
