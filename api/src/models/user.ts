import * as bcrypt from 'bcrypt';
module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("User", {
    email: DataTypes.STRING,
    password: DataTypes.STRING
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