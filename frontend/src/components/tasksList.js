import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import React from 'react';
import { gql, useQuery, useMutation } from "@apollo/client";

const mutateTask = gql`
mutation updateTask($id: Int!,$done: Boolean!){
  updateTask(
    id: $id,
    done: $done
  ) {
    id,
    updatedAt,
    text,
    done
  }
}
`;

const ChangeTask = ({id, done, doneMutate }) => {
    const [updateTask] = useMutation(mutateTask);
    console.log(typeof id)
    console.log(typeof done)
    const handleClick = async () => {
        await updateTask({
            variables: {
                id,
                done
            }
        });
        doneMutate();
    };
    return <Checkbox checked={done} onChange={handleClick}/>
}
const GET_TASKS = gql`
    query GetTasks {
        tasks {
            id
            text
            done
            goal_id
        }
    }
`;

function TaskList(props) {
    const { loading, error, data, refetch } = useQuery(GET_TASKS);
    const tasks = data?.tasks;

    if (loading) {
        return <h2>Loading...</h2>
    }
    if (!tasks.length) {
        return <h2>No tasks yet</h2>
    }
    return (
        <div>
            {
                tasks.map((task) => (task.goal_id === props.goal_id ?
                    <Box key={task.id} sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
                        <FormControlLabel
                            label={task.text}
                            disabled={!props.goal_done}
                            control={<ChangeTask id={task.id} done={!task.done} doneMutate={refetch}/>}
                        />
                    </Box>
                    :
                    <div key={Math.random()}></div>))
            }
        </div>

    )
}

export default TaskList;