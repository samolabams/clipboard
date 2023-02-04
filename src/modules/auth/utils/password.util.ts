import * as bcrypt from 'bcryptjs';

export const comparePassword = async (plainPassword: string, hashedPassword: string) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
