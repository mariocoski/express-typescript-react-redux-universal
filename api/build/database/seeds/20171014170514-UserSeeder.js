'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.bulkInsert('users', [
            {
                id: 1,
                email: 'user@test.com',
                password: 'password',
                first_name: 'Joe',
                last_name: 'Doe',
                bio: 'Joe is a user'
            },
            {
                id: 2,
                email: 'admin@test.com',
                password: 'password',
                first_name: 'John',
                last_name: 'Doe',
                bio: 'John is an admin'
            },
            {
                id: 3,
                email: 'superadmin@test.com',
                password: 'password',
                first_name: 'Jane',
                last_name: 'Doe',
                bio: 'Jane is a superadmin'
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
        return queryInterface.bulkDelete('User', null, {});
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.
    
          Example:
          return queryInterface.bulkDelete('Person', null, {});
        */
    }
};
//# sourceMappingURL=20171014170514-UserSeeder.js.map