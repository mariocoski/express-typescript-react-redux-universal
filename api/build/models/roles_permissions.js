"use strict";
module.exports = function (sequelize, DataTypes) {
    var RolePermission = sequelize.define('roles_permissions', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        role_id: {
            type: DataTypes.INTEGER
        },
        permission_id: {
            type: DataTypes.INTEGER
        }
    }, {
        tableName: 'roles_permissions',
        timestamps: false
    });
    return RolePermission;
};
//# sourceMappingURL=roles_permissions.js.map