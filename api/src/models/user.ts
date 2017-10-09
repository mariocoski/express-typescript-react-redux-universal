import * as bcrypt from 'bcrypt';

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
    bio: DataTypes.TEXT
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      }
    }
  });

  User.beforeCreate((user, options) => {
    return bcrypt.hash(user.password, 10)
                  .then(hash => {
                      user.password = hash;
                  })
                  .catch(err => { throw new Error(); });
  });

  return User;
};