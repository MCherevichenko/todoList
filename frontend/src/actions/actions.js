export const CREATE_GOAL = "CREATE_GOAL";
export const DELETE_GOAL = "DELETE_GOAL";
export const UPDATE_GOAL = "UPDATE_GOAL";
export const GOALS_REQUESTED = "GOALS_REQUESTED";
export const GOALS_SUCCEEDED = "GOALS_SUCCEEDED";
export const GOALS_REJECTED = "GOALS_REJECTED";

const createAction = (type) => {
    const actionCreator = (payload) => ({ type, payload });
    actionCreator.toString = () => type;
    return actionCreator;
};

export const createGoal = createAction(CREATE_GOAL);
export const deleteGoal = createAction(DELETE_GOAL);
export const updateGoal = createAction(UPDATE_GOAL);
export const getGoals = createAction(GOALS_REQUESTED);