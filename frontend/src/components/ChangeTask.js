import { gql, useQuery, useMutation } from "@apollo/client";
import Checkbox from '@mui/material/Checkbox';
import React, { useEffect, useState } from 'react';

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




const ChangeTask = ({ id, done, doneMutate, idGoal, disabled, tasks }) => {
    const [updateTask] = useMutation(mutateTask);
    
    const handleClick = async (event) => {
        await updateTask({
            variables: {
                id,
                done: event.target.checked
            }
        });
        doneMutate();
    };
    return <Checkbox disabled={disabled} checked={done} onChange={handleClick} />
}

export default ChangeTask;