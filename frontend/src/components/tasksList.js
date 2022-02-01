import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import React from 'react';
import { gql, useQuery, useMutation } from "@apollo/client";

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
    const { loading, error, data } = useQuery(GET_TASKS);
    const tasks = data?.tasks;

    if (loading) {
        return <h2>Loading...</h2>
    }
    console.log(tasks.length)
    return (
        <div>
            {tasks.length === 0 ? <h2>Пусто</h2> : tasks.map((task) => ( task.goal_id === props.goal_id ?
                <Box key={task.id} sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
                    <FormControlLabel
                        label={task.text}
                        control={<Checkbox />}
                    />
                </Box> : <div key={Math.random()}>There are no tasks</div>
            ))
            }
        </div>

    )
}

export default TaskList;