"use client"
import { useGlobalState } from '@/app/Context/GlobalProvider'
import { CreateContent } from '@/app/Modals/CreateContent'
import { title } from 'process'
import React from 'react'
import styled from 'styled-components'
import TaskItem from '../TaskItem/TaskItem'

interface Props {
  title: string;
  tasks: any[];
}

const Tasks = ({ title, tasks }: Props) => {
  const { theme } = useGlobalState();
  return (
    <TaskStyled theme={theme}>
      <h1>{title}</h1>
      <div className='tasks grid'>
        {tasks.map((task) => (
          <TaskItem key={task.id}
            title={task.title}
            description={task.description}
            date={task.date}
            isCompleted={task.isCompleted}
            id={task.id}
          />
        ))}
        <button className="create-task">
          + Add Task
        </button>
      </div>
    </TaskStyled>
  )
}

const TaskStyled = styled.main`
    padding: 2rem;
    width: 100%;
    background-color: ${(props) => props.theme.colorBg2};
    border: 2px solid ${(props) => props.theme.borderColor2};
    border-radius: 1rem;
    height: 100%;

    overflow-y: auto;

&::-webkit-scrollbar{
    width: 0.5rem;
} 
.tasks{
   margin: 1rem 0;
}
>h1{
font-size: clamp(1.5rem, 5vw, 2.5rem);
font-weight: 800;
position: relative;
}
&::after{
  content: "";
  position: absolute;
  bottom: -0.5rem;
  left: 0;
  width: 3rem;
  height: 0.2rem;
  background-color: ${(props) => props.theme.colorPrimaryGreen};
  border-radius: 0.5rem;
}
.create-task{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: 16rem;
  color: ${(props) => props.theme.colorGrey2};
  font-weight: 600;
  cursor: pointer;
  border-radius: 1rem;
  border: 3px dashed ${(props) => props.theme.borderGrey5};

  &:hover{
    background-color: ${(props) => props.theme.colorGrey5};
    color: ${(props) => props.theme.colorGrey1};
  }
}
`;

export default Tasks;