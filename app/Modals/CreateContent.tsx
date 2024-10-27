"use client";

import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import styled from 'styled-components';
import { useGlobalState } from '../Context/GlobalProvider';
import Button from '../Components/Button/Button';

export const CreateContent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [completed, setCompleted] = useState(false);
  const [important, setImportant] = useState(false);

  const {theme, allTasks, closeModal} = useGlobalState();

  const handleChange = (name: string) => (e: any) => {
    switch (name) {
      case "title":
        setTitle(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;
      case "date":
        setDate(e.target.value);
        break;
      case "completed":
        setCompleted(e.target.checked);
        break;
      case "important":
        setImportant(e.target.checked);
        break;
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const task = {
      title,
      description,
      date,
      completed,
      important
    };

    console.log("Task to be sent:", task); 

    try {
      const res = await axios.post("/api/tasks", task);
      console.log("Response from server:", res.data);
      if(res.data.error) {
        toast.error(res.data.error);
      } 
      if(!res.data.error) {
      toast.success("Task created successfully");
      allTasks();
      closeModal();
      }
    }catch (error) {
      toast.error("Something went wrong");
      console.error("Error response:", error); // Log full error response

    }

    console.log(title, description, date, completed, important);
  }

  return (
    <CreateContextStyled onSubmit={handleSubmit} theme={theme}>
<div>
      <h1>Create a Task</h1>
      <div className="input-control">
        <label htmlFor="title">Title</label>
        <input type="text" id="title" value={title} name='title' onChange={handleChange("title")} placeholder='title'/>
      </div>
      <div className="input-control">
        <label htmlFor="description">Description</label>
        <textarea rows={4} id="description" value={description} name='description' onChange={handleChange("description")} placeholder='description'/>
      </div>
      <div className="input-control">
        <label htmlFor="date">Date</label>
        <input type="date" id="date" value={date} name='date' onChange={handleChange("date")} placeholder='date'/>
      </div>
      <div className="input-control toggler">
        <label htmlFor="date">Toggle Completed</label>
        <input type="checkbox" id="completed" value={completed.toString()} name='completed' onChange={handleChange("completed")} placeholder='completed'/>
      </div>
      <div className="input-control toggler">
        <label htmlFor="date">Toggle Important</label>
        <input type="checkbox" id="important" value={important.toString()} name='important' onChange={handleChange("important")} placeholder='important'/>
      </div>
      <div className="submit-btn flex justify-end">
        <Button type='submit' name='Create Task' paddding={"0.8rem 2rem"} borderRad={"0.5rem"} fw={"500"} fs={"1.2rem"} background={theme.colorGreenDark}/>
      </div>
    </div>
    </CreateContextStyled>
    
  )
}

const CreateContextStyled = styled.form`
> h1{
  font-size: clamp(1.2rem, 5vw, 1.6rem); 
  font-weight: 600;
}

.toggler{
display: flex;
align-items: center;
justify-content: space-between;

label{
flex: 1;
}
input{
width: initial;}
}

  color: ${(props) => props.theme.colorGrey1};

  .input-control{
   position: relative;
   margin: 1.5rem 0;
   font-weight: 500;

   label{
   margin-bottom: 1rem;
   display: inline-block;
   font-size: clamp(0.9rem, 5vw, 1.2rem);
   }

   input, textarea{
     width: 100%;
     border: none;
     padding: 1rem;
     resize: none;
     background-color: ${(props) => props.theme.colorGreyDark};
     color: ${(props) => props.theme.colorGrey2};
   }
  }
`

export default CreateContent;
