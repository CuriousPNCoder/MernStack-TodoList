"use client";
import { useGlobalState } from '@/app/Context/GlobalProvider';
import React from 'react'
import styled from 'styled-components';
import formatDate from '../../utils/formatDate';

interface Props {
    title: string;
    description: string;
    date: string;
    isCompleted: boolean;
    id: string;
}

const TaskItem = ({ title, description, date, isCompleted, id }: Props ) => {
    const { theme } = useGlobalState();
  return (
    <TaskItemStyled theme={theme}>
        <h1>{title}</h1>
        <p>{description}</p>
        <p className='date'>{formatDate(date)}</p>
        <div className='task-footer'>
            {isCompleted ? (<button className='completed'>Completed</button> ) : (<button className='incompleted'>Incompleted</button>)
            }
            <button className="edit">
                Edit
            </button>
            <button className='delete'>Delete</button>
        </div>
    </TaskItemStyled>
  )
}

const TaskItemStyled = styled.div`
padding: 1.2rem 1rem;
border-radius: 1rem;
background-color: ${(props) => props.theme.borderColor2};
box-shadow: 0 0 1rem rgba(0,0,0,0.1);
border: 2px solid ${(props) => props.theme.borderColor2};

height: 16rem;
display: flex;
flex-direction: column;
gap: 0.5rem;

.date{
margin-top: auto;
}
> h1{
 font-size: 1.5rem;
 font-weight: 600; 
}
 .task-footer{
     display: flex;
     align-items: center;
     gap: 1.2rem;
 }
button{
    border: none;
    outline: none;
    cursor: pointer;   
}
i{
    font-size: 1.4rem;
    color: ${(props) => props.theme.colorGrey2};
}
.edit{
    margin-left: auto;
}
.completed,
.incompleted{
    display:inline-block;
    padding: 0.5rem 1rem;
    background-color: ${(props) => props.theme.colorDanger};
    border-radius: 30px;
}
.completed{
    background-color: ${(props) => props.theme.colorGreenDark};
}
`;

export default TaskItem