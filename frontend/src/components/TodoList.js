import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { gql, useQuery, useMutation } from "@apollo/client";
import TaskList from './TasksList';

const GET_GOALS = gql`
    query GetGoals{
        goals {
            id
            title
            done
        }
    }
`;

const mutateTask = gql`
        mutation ($id: Int,$done: Boolean){
        updateTask(
        done: $done
        ) {
        id,
        done
        }
    }
`;

function TodoList() {
    const { loading, error, data } = useQuery(GET_GOALS);
    const goals = data && data?.goals;

    if (loading) {
        return <h2>Loading...</h2>
    }

    return (
        <div className='goal-form'>
            <FormGroup >
                {goals.map((goal, index, arr) => (
                    goal === goals[0] ?
                        <div key={goal.id} className='goal-container'>
                            <FormControlLabel control={
                                <Checkbox checked={goal.done} />}
                                label={goal.title}
                            />
                            <TaskList goal_id={goal.id} goal_done={true} />
                        </div>
                        :
                        <div key={goal.id} className='goal-container'>
                            <FormControlLabel disabled={!goals[index - 1].done} control={<Checkbox checked={goal.done} />} label={goal.title} />
                            <TaskList goal_id={goal.id} goal_done={goals[index - 1].done} />
                        </div>

                ))}
            </FormGroup>
        </div >
    )
}

export default TodoList;