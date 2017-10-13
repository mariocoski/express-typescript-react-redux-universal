module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate(models) {
        Role.hasMany(models.Permission)
      }
    }
  });


  return Role;
};