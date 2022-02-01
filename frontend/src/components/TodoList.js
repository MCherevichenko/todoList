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

function TodoList() {
    const { loading, error, data } = useQuery(GET_GOALS);
    const goals = data && data?.goals;
    if (loading ) {
        return <h2>Loading...</h2>
    }
    return (
        <div className='goal-form'>
            <FormGroup >
                {goals.map((goal) => (
                    <div key={goal.id} className='goal-container'>
                        <FormControlLabel  control={<Checkbox defaultChecked={goal.done} />} label={goal.title} />
                        <TaskList goal_id={goal.id}/>
                    </div>
                ))}
            </FormGroup>

        </div >
    )
}

export default TodoList;