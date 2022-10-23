const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userid',
      });
    }
  }
  Task.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    userid: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};
