import * as bcrypt from 'bcrypt';
import { generateHash } from '../utils';
module.exports = (sequelize, DataTypes) => {
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
    created_at: {
      type: DataTypes.DATE,
      field: 'created_at',
      defaultValue: DataTypes.NOW 
    },
    updated_at: {
      type: DataTypes.DATE,
      field: 'updated_at'
    },
    deleted_at: {
      type: DataTypes.DATE,
      field: 'updated_at'
    }
  }, {
    tableName: 'users',
  });

  User.associate = (models) => {
    User.belongsToMany(models.Role,{
      through: 'users_roles',
      foreignKey: 'user_id'
    });
  }
  

  User.beforeCreate(async (user, options) => {
   user.password = await generateHash(user.password);
    // return User;
    // return bcrypt.hash(user.password, 10)
    //               .then(hash => {
    //                   user.password = hash;
    //               })
    //               .catch(err => { throw new Error(); });
  });

  return User;
};