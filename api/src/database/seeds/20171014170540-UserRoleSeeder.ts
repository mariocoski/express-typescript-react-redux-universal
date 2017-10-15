'use strict';
import {USER_ROLE, ADMIN_ROLE, SUPERADMIN_ROLE} from '../../constants/roles';
import {getRoleId} from '../../utils';
import { seedUsersRoles } from '../../utils';
module.exports = {
  up: (queryInterface:any, Sequelize:any) => {
    return seedUsersRoles(queryInterface)
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface: any, Sequelize:any) => {
    return queryInterface.bulkDelete('users_roles', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
