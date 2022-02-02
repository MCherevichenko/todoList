import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import React, { useEffect } from 'react';
import { gql, useQuery, useMutation } from "@apollo/client";
import ChangeTask from './ChangeTask';

const mutateGoal = gql`
mutation updateGoal($idGoal: Int!,$doneGoal: Boolean!){
    updateGoal(
        idGoal:$idGoal,
        doneGoal:$doneGoal
    ) {
      id,
      updatedAt
    }
  }
`;

const  TaskList = (props) => {
    const [updateGoal] = useMutation(mutateGoal);
    const tasks = props.tasks;
    const reload =props.ReloadData;
    useEffect(async () => {
        if (tasks?.length) {
            
        
        if(tasks.every(task => task.done)) {
            await updateGoal({
                variables: {
                    idGoal: props.goal_id,
                    doneGoal: true
                }
            })
        } else {
            await updateGoal({
                variables: {
                    idGoal: props.goal_id,
                    doneGoal: false
                }
            })
        }
        reload();
    }
    }, [tasks])

    if (!tasks?.length) {
        return <h2>No tasks yet</h2>
    }

    

    return (
        <div>
            {
                tasks.map((task) => (
                    <Box key={task.id} sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
                        <FormControlLabel
                            label={task.text}
                            disabled={!props.prev_goal_done}
                            control={<ChangeTask tasks={tasks} id={task.id} disabled={!props.prev_goal_done} done={task.done} doneMutate={reload} idGoal={task.goal_id} />}
                        />
                    </Box>
                ))
            }
        </div>

    )
}

export default TaskList;