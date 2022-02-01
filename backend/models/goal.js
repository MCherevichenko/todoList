'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Goal extends Model {

    static associate(models) {
      Goal.hasMany(models.Task, {
        foreignKey: 'goal_id',
        as: 'tasks',
      });
    }
  }
  Goal.init({
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Goal',
  });
  return Goal;
};