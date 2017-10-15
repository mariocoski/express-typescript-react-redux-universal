"use strict";
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('roles_permissions', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            role_id: {
                type: Sequelize.INTEGER
            },
            permission_id: {
                type: Sequelize.INTEGER
            }
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('roles_permissions');
    }
};
//# sourceMappingURL=20171014120633-create-roles-permissions.js.map