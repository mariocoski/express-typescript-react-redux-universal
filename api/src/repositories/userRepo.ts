const db = require('../models');


export async function findUserById(id: string) {
  return db.User.findById(id);
}

export async function findUserByEmail(email: string) {
  return db.User.findOne({ where: { email } });
}

export async function findUserByToken(token: string){
  return db.User.findOne({ where: { password_reset_token: token } });
}

export async function createUser(values: Object, settings: Object = {}) {
  const options = { fields: 
    ['email','password', 'first_name', 'last_name', 'bio','password_reset_token', 'password_reset_token_expired_at'],
    ...settings 
  };
  return db.User.create(values, options);
}

export default {
  findUserByToken,
  findUserByEmail,
  createUser
}
