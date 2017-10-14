'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.bulkInsert('roles', [
            {
                id: 1,
                name: 'user',
                description: 'user role'
            },
            {
                id: 2,
                name: 'admin',
                description: 'admin role'
            },
            {
                id: 3,
                name: 'superadmin',
                description: 'superadmin role'
            }
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
    down: function (queryInterface, Sequelize) {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.
    
          Example:
          return queryInterface.bulkDelete('Person', null, {});
        */
    }
};
//# sourceMappingURL=20171014170533-RoleSeeder.js.map