module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define('Permission', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    tableName: 'permissions'
  });

  Permission.associate = (models) => {
    Permission.belongsToMany(models.Role, {
      through: 'roles_permissions', foreignKey: 'permission_id'
    });
  }

  return Permission;
};