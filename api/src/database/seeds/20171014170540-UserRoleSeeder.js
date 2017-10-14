'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users_roles', [
      {
        user_id: 1,
        role_id: 1
      },
      {
        user_id: 2,
        role_id: 1
      },
      {
        user_id: 2,
        role_id: 2
      },
      {
        user_id: 3,
        role_id: 1
      },
      {
        user_id: 3,
        role_id: 2
      },
      {
        user_id: 3,
        role_id: 3
      },
    ], {});
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

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
