"use client";

import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

export const CreateContent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [completed, setCompleted] = useState(false);
  const [important, setImportant] = useState(false);

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

    console.log("Task to be sent:", task); // Log task object

    try {
      const res = await axios.post("/api/tasks", task);
      console.log("Response from server:", res.data);
      if(res.data.error) {
        toast.error(res.data.error);
      } toast.success("Task created successfully");
    }catch (error) {
      toast.error("Something went wrong");
      console.error("Error response:", error); // Log full error response

    }

    console.log(title, description, date, completed, important);
  }

  return (
    <form onSubmit={handleSubmit}>
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
      <div className="input-control">
        <label htmlFor="date">Toggle Completed</label>
        <input type="checkbox" id="completed" value={completed.toString()} name='completed' onChange={handleChange("completed")} placeholder='completed'/>
      </div>
      <div className="input-control">
        <label htmlFor="date">Toggle Important</label>
        <input type="checkbox" id="important" value={important.toString()} name='important' onChange={handleChange("important")} placeholder='important'/>
      </div>
      <div className="submit-btn">
        <button type='submit'>
          <span>Submit</span>
        </button>
      </div>
    </div>
    </form>
    
  )
}
export default CreateContent;