module.exports = (sequelize, DataTypes) => {
  const RolePermission = sequelize.define('RolesPermissions', {
    id : {
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
  },{
    tableName: 'roles_permissions',
    timestamps: false
  });
  return RolePermission;
};
