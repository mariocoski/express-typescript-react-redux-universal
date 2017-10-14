module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define('UsersRoles', {
    id : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER
    },
    role_id: {
      type: DataTypes.INTEGER
    }
  },{
    tableName: 'users_roles',
    timestamps: false
  });
  return UserRole;
};
