import { CREATE_GOAL, DELETE_GOAL, UPDATE_GOAL, GOALS_REQUESTED, GOALS_SUCCEEDED, GOALS_REJECTED } from '../actions/actions';

const initialState = {
    goals: [],
    tasks: [],
    isFetching: false,
    error: null,
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_GOAL:
            return {
                ...state, goals: action.payload, isFetching: false,
            }
        case GOALS_REQUESTED:
            return {
                ...state, isFetching: true,
            }
        case GOALS_SUCCEEDED:
            return {
                ...state, isFetching: false, goals: action.payload,
            }
        case GOALS_REJECTED:
            return {
                ...state, isFetching: false, error: action.error,
            }
        default:
            return state
    }
}

export default rootReducer;