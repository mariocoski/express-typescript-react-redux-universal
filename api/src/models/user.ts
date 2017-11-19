import * as bcrypt from 'bcrypt';
import { generateHash } from '../utils';
module.exports = (sequelize: any, DataTypes: any) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    password: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    bio: DataTypes.TEXT,
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    verify_token: DataTypes.STRING,
    password_reset_token: DataTypes.STRING,
    password_reset_token_expired_at:  DataTypes.DATE,
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
      defaultValue: DataTypes.NOW 
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
    },
    deletedAt: {
      type: DataTypes.DATE,
      field: 'deleted_at'
    }
  }, {
    tableName: 'users'
  });

  User.associate = (models: any) => {
    User.belongsToMany(models.Role,{
      through: 'users_roles',
      foreignKey: 'user_id'
    });

    User.hasMany(models.Todo,{
      foreignKey: 'user_id',
      constraints: false,
    });
  }
  
  User.beforeCreate(async (user: any, options: object) => {
    user.password = await generateHash(user.password);
    return user;
  });

  return User;
};