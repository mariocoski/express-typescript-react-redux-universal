module.exports = function (sequelize, DataTypes) {
    var Role = sequelize.define('Role', {
        name: DataTypes.STRING,
        description: DataTypes.STRING
    }, {
        classMethods: {
            associate: function (models) {
                Role.hasMany(models.Permission);
            }
        }
    });
    return Role;
};
//# sourceMappingURL=permission.js.map