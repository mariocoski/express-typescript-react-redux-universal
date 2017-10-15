"use strict";
module.exports = function (sequelize, DataTypes) {
    var Permission = sequelize.define('Permission', {
        name: DataTypes.STRING,
        description: DataTypes.STRING
    }, {
        tableName: 'permissions'
    });
    Permission.associate = function (models) {
        Permission.belongsToMany(models.Role, {
            through: 'roles_permissions', foreignKey: {
                unique: false
            }
        });
    };
    return Permission;
};
//# sourceMappingURL=permission.js.map