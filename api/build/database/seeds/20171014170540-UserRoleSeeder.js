'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
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
    down: function (queryInterface, Sequelize) {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.
    
          Example:
          return queryInterface.bulkDelete('Person', null, {});
        */
    }
};
//# sourceMappingURL=20171014170540-UserRoleSeeder.js.map