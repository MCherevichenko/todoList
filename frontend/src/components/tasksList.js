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
    const {loading, error, data} = useQuery(GET_TASKS);
    // console.log(props.goal_id);
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
            <FormControlLabel
                label="Child 1"
                control={<Checkbox />}
            />
        </Box>
    )
}

export default TaskList;