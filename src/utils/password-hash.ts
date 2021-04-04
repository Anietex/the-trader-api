import bcrypt from 'bcryptjs';
/**
 * Handles hashing and verifying hashed password
 */
export default {
  hash(password: string) {
    const SALT_ROUNDS = 10;
    const SALT = bcrypt.genSaltSync(SALT_ROUNDS);
    return bcrypt.hashSync(password, SALT);
  },

  verify(plainTextPassword: string, hashedPassword: string) {
    return bcrypt.compareSync(plainTextPassword, hashedPassword);
  },
};
