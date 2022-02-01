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
    text: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};