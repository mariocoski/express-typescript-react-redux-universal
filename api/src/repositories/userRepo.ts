const db = require('../models');

export async function findUserByEmail(email: string) {
  return db.User.findOne({ where: { email } });
}

export async function findUserByToken(token: string){
  return db.User.findOne({ where: { password_reset_token: token } });
}

export async function createUser(values: Object, settings: Object = {}) {
  const options = { fields: 
    ['email','password', 'first_name', 'last_name', 'bio'],
    ...settings 
  };
  return db.User.create(values, options);
}

export default {
  findUserByToken,
  findUserByEmail,
  createUser
}
