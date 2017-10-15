module.exports = (sequelize: any, DataTypes: any) => {
  const Permission = sequelize.define('Permission', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    tableName: 'permissions'
  });

  Permission.associate = (models: any) => {
    Permission.belongsToMany(models.Role, {
      through: 'roles_permissions',  foreignKey: {
        unique: false
      }
    });
  }

  return Permission;
};