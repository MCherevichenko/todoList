import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { gql, useQuery, useMutation } from "@apollo/client";

const GET_GOALS = gql`
    query GetGoals{
        goals {
            id
            title
        }
    }
`

function TodoList() {
    const { loading, error, data } = useQuery(GET_GOALS);
    console.log(loading)
    console.log(error)
    console.log(data)
    const goals =  data && data?.goals;
    // console.log(data?.goals);
    if(loading){
        return <h2>Loading...</h2>
    }
    console.log(goals)
    return (
        <div className='goal-form'>
            {goals.map((goal) => (
                <div key={goal.id}>
                    <FormGroup > 
                        <FormControlLabel  control={<Checkbox defaultChecked />} label={goal.title} />
                    </FormGroup>
                </div>
            ))}
        </div>
    )
}

export default TodoList;