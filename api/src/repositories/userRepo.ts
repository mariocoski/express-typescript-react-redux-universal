const db = require('../models');


export async function findUserById(id: number) {
  return db.User.findById(id);
}

export async function findUserByEmail(email: string) {
  return db.User.findOne({ where: { email } });
}

export async function findUserByResetPasswordToken(token: string){
  return db.User.findOne({ where: { password_reset_token: token } });
}

export async function createUser(values: Object, settings: Object = {}) {
  const options = { fields: 
    ['email','password', 'first_name', 'last_name', 'bio','password_reset_token', 
    'password_reset_token_expired_at','verify_token'],
    ...settings 
  };
  return db.User.create(values, options);
}

export default {
  findUserByResetPasswordToken,
  findUserByEmail,
  createUser
}
