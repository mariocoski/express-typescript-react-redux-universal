"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../utils");
module.exports = {
    up: function (queryInterface, Sequelize) {
        return utils_1.seedRoles(queryInterface);
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
    down: function (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('roles', null, {});
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.
    
          Example:
          return queryInterface.bulkDelete('Person', null, {});
        */
    }
};
//# sourceMappingURL=20171014170533-RoleSeeder.js.map