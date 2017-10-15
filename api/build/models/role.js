"use strict";
module.exports = function (sequelize, DataTypes) {
    var Role = sequelize.define('Role', {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at',
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at',
            allowNull: true
        }
    }, {
        tableName: 'roles'
    });
    Role.associate = function (models) {
        Role.belongsToMany(models.User, {
            through: 'users_roles', foreignKey: {
                unique: false
            }
        });
        // Role.belongsToMany(models.Permission, { 
        //   through: 'roles_permissions',  foreignKey: {
        //     unique: false
        //   }
        // });
    };
    return Role;
};
//# sourceMappingURL=role.js.map