module.exports = (sequelize: any, DataTypes: any) => {
  const Todo = sequelize.define('Todo', {
    id : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      field: 'user_id',
    },
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    created_at: {
      type: DataTypes.DATE,
      field: 'created_at',
      defaultValue: DataTypes.NOW 
    },
    updated_at: {
      type: DataTypes.DATE,
      field: 'updated_at'
    },
    completed_at: {
      type: DataTypes.DATE,
      field: 'completed_at'
    },
    deleted_at: {
      type: DataTypes.DATE,
      field: 'deleted_at'
    }
  },{
    tableName: 'todos',
    timestamps: false
  });

   Todo.associate = (models: any) => {
    Todo.belongsTo(models.User,{
      foreignKey: {
        unique: false
      }
    });
  }

  return Todo;
};
