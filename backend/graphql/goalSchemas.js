const GraphQLSchema = require('graphql').GraphQLSchema;
const GraphQLObjectType = require('graphql').GraphQLObjectType;
const GraphQLList = require('graphql').GraphQLList;
const GraphQLBoolean = require('graphql').GraphQLBoolean;
const GraphQLNonNull = require('graphql').GraphQLNonNull;
const GraphQLID = require('graphql').GraphQLID;
const GraphQLString = require('graphql').GraphQLString;
const GraphQLInt = require('graphql').GraphQLInt;
const GraphQLDate = require('graphql-date');
const GoalModel = require('../models').Goal;
const TaskModel = require('../models').Task;
const exec  = require('child_process').exec;

const taskType = new GraphQLObjectType({
  name: "task",
  fields: function () {
    return {
      id: {
        type: GraphQLInt
      },
      text: {
        type: GraphQLString
      },
      done: {
        type: GraphQLBoolean
      },
      goal_id: {
        type: GraphQLInt
      },
      createdAt: {
        type: GraphQLDate
      },
      updatedAt: {
        type: GraphQLDate
      },
    }
  }
})

const goalType = new GraphQLObjectType({
  name: "goal",
  fields: function () {
    return {
      id: {
        type: GraphQLInt
      },
      title: {
        type: GraphQLString
      },
      done: {
        type: GraphQLBoolean
      },
      createdAt: {
        type: GraphQLDate
      },
      updatedAt: {
        type: GraphQLDate
      }
    };
  }
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: function () {
    return {
      goals: {
        type: new GraphQLList(goalType),
        resolve: function () {
          const goals = GoalModel.findAll({
            order: [
              ['createdAt', 'ASC']
            ],
          })
          if (!goals) {
            throw new Error('Error')
          }
          return goals
        },
      },
      goal: {
        type: new GraphQLList(goalType),
        args: {
          id: {
            name: 'id',
            type: GraphQLInt
          }
        },
        resolve: function(root, params) {
          const currentGoal = GoalModel.findAll({
            where: { 
              id: params.id
            }
          })
          if(!currentGoal) {
            throw new Error('Error')
          }
          return currentGoal
        }
      },
      task: {
        type: new GraphQLList(taskType),
        args: {
          id: {
            name: 'goal_id',
            type: GraphQLInt
          }
        },
        resolve: function (root, params) {
          const asd = TaskModel.findAll({
            order: [
              ['createdAt', 'ASC']
            ],
            where: {
              goal_id: params.id,
            }
          })
          if (!asd) {
            throw new Error('Error')
          }
          return asd
        }
      },
      tasks: {
        type: new GraphQLList(taskType),
        resolve: function () {
          const tasks = TaskModel.findAll({
            order: [
              ['createdAt', 'ASC']
            ],
          })
          if (!tasks) {
            throw new Error('Error')
          }
          return tasks
        }
      },
      
    }
  }
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: function () {
    return {
      addGoal: {
        type: goalType,
        args: {
          title: {
            type: new GraphQLNonNull(GraphQLString)
          },
          done: {
            type: new GraphQLNonNull(GraphQLBoolean)
          },
        },
        resolve: function (root, params) {
          const goalModel = new GoalModel(params);
          const newGoal = goalModel.save();
          if (!newGoal) {
            throw new Error('Error');
          }
          return newGoal
        }
      },
      updateGoal: {
        type: goalType,
        args: {
          id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLInt)
          },
          title: {
            type: new GraphQLNonNull(GraphQLString)
          },
          done: {
            type: new GraphQLNonNull(GraphQLBoolean)
          }
        },
        resolve(root, params) {
          return GoalModel
            .findByPk(params.id)
            .then(goal => {
              if (!goal) {
                throw new Error('Not found');
              }
              return goal
                .update({
                  title: params.title || goal.title,
                  done: params.done
                })
                .then(() => { return goal; })
                .catch((error) => { throw new Error(error); });
            })
            .catch((error) => { throw new Error(error); });
        }
      },
      removeGoal: {
        type: goalType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve(root, params) {
          return GoalModel
            .findByPk(params.id)
            .then(goal => {
              if (!goal) {
                throw new Error('Not found');
              }
              return goal
                .destroy()
                .then(() => { return goal; })
                .catch((error) => { throw new Error(error); });
            })
            .catch((error) => { throw new Error(error); });
        }
      },
      addTask: {
        type: taskType,
        args: {
          text: {
            type: new GraphQLNonNull(GraphQLString)
          },
          done: {
            type: new GraphQLNonNull(GraphQLBoolean)
          },
          goal_id: {
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve: function (root, params) {
          const taskModel = new TaskModel(params);
          const newTask = taskModel.save();
          if (!newTask) {
            throw new Error('Error');
          }
          return newTask
        }
      },
      updateTask: {
        type: taskType,
        args: {
          id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLInt)
          },
          done: {
            type: new GraphQLNonNull(GraphQLBoolean)
          }
        },
        resolve(root, params) {
          return TaskModel
            .findByPk(params.id)
            .then(task => {
              if (!task) {
                console.log(task);
                throw new Error('Not found');
              }
              return task
                .update({
                  done: params.done
                })
                .then(() => { return task; })
                .catch((error) => { throw new Error(error); });
            })
            .catch((error) => { throw new Error(error); });
        }
      },
      removeTask: {
        type: taskType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve(root, params) {
          return TaskModel
            .findByPk(params.id)
            .then(task => {
              if (!task) {
                throw new Error('Not found');
              }
              return task
                .destroy()
                .then(() => { return task; })
                .catch((error) => { throw new Error(error); });
            })
            .catch((error) => { throw new Error(error); });
        }
      },
    }
  }
});

module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });