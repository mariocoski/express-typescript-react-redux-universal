'use strict';

module.exports = {
  up: (queryInterface: any, Sequelize: any) => {
    // return queryInterface.bulkInsert('Permission', [
    //   {
    //     id: 1,
    //     name: '',
    //     description: ''
    //   },
    
    // ], {});
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

  down: (queryInterface: any, Sequelize: any) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
