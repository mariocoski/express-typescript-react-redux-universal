"use strict";
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('users_roles', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            user_id: {
                type: Sequelize.INTEGER,
                field: 'user_id',
                references: {
                    model: 'users',
                    key: 'id'
                }
            },
            role_id: {
                field: 'role_id',
                type: Sequelize.INTEGER,
                references: {
                    model: 'roles',
                    key: 'id'
                }
            }
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('users_roles');
    }
};
//# sourceMappingURL=20171014115714-create-users-roles.js.map