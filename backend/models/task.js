'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {

    static associate(models) {
      Task.belongsTo(models.Goal, {
        foreignKey: 'goal_id',
        as: 'goal',
      });
    }
  }
  Task.init({
    text: DataTypes.STRING,
    goal_id: DataTypes.INTEGER,
    done: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};