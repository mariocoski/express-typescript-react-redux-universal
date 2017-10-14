module.exports = function (sequelize, DataTypes) {
    var Role = sequelize.define('Role', {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        created_at: {
            type: DataTypes.DATE,
            field: 'created_at',
            defaultValue: DataTypes.NOW
        },
        updated_at: {
            type: DataTypes.DATE,
            field: 'updated_at',
            allowNull: true
        }
    }, {
        tableName: 'roles'
    });
    Role.associate = function (models) {
        Role.belongsToMany(models.User, {
            through: 'users_roles', foreignKey: 'role_id'
        });
        Role.belongsToMany(models.Permission, {
            through: 'roles_permissions', foreignKey: 'role_id'
        });
    };
    return Role;
};
//# sourceMappingURL=role.js.map