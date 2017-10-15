const db = require('../models');

export async function associateRole(user_id: number, role_id: number) {
  return db.users_roles.create({user_id, role_id});
}

export default {
  associateRole
}
