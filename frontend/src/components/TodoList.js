import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { gql, useQuery, useMutation } from "@apollo/client";
import TaskList from './TasksList';
import { useEffect, useState } from 'react';

const GET_GOALS = gql`
    query GetGoals{
        goals {
            id
            title
            done
        }
    }
`;

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



function TodoList() {
    const { loading, error, data, refetch } = useQuery(GET_GOALS);
    const { data: dataTasks, loading: loadTasks , refetch: refetchTasks } = useQuery(GET_TASKS);
    const tasks = dataTasks?.tasks;

    function ReloadData() {
        refetch();
        refetchTasks();
    }

    const goals = data && data?.goals;

    if (loading) {
        return <h2>Loading...</h2>
    }

    if(loadTasks){
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
                            <TaskList ReloadData={ReloadData} tasks={tasks.filter(elem => elem.goal_id === goal.id)} goal_id={goal.id} prev_goal_done={true}/>
                        </div>
                        :
                        <div key={goal.id} className='goal-container'>
                            <FormControlLabel disabled={!goals[index - 1].done} control={<Checkbox checked={goal.done} />} label={goal.title} />
                            <TaskList ReloadData={ReloadData} tasks={tasks.filter(elem => elem.goal_id === goal.id)} goal_id={goal.id} prev_goal_done={goals[index - 1].done} />
                        </div>
                ))}
            </FormGroup>
        </div >
    )
}

export default TodoList;