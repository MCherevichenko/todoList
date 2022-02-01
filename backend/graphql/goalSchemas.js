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
      }
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
        }
      }
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
      }
    }
  }
});

module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });