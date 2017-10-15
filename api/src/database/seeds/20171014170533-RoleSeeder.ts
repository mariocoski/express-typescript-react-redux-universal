import {USER_ROLE, ADMIN_ROLE, SUPERADMIN_ROLE} from '../../constants/roles';
import { seedRoles } from '../../utils';
module.exports = {
  up: (queryInterface:any, Sequelize:any) => {
    return seedRoles(queryInterface)
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface:any.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface:any, Sequelize:any) => {
    return queryInterface.bulkDelete('roles', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
