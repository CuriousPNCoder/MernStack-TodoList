"use client";
import { useState } from "react";
import Tasks from "./Components/Tasks/Tasks";
import { useGlobalState } from "./Context/GlobalProvider";
import styled from "styled-components";

interface Task {
  id: number;       
  title: string;   
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleTasks, setVisibleTasks] = useState(8);

  const { tasks } = useGlobalState();
  const filteredTasks = (tasks as Task[]).filter((task: Task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tasksToShow = filteredTasks.slice(0, visibleTasks);

  const handleShowMore = () => {
    setVisibleTasks((prev) => prev + 8); // Show 8 more tasks
  };
  
  // const {tasks} = useGlobalState();
  // const filteredTasks = (tasks as Task[]).filter((task: Task) =>
  //   task.title.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  // return <><Tasks title="All Tasks" tasks={tasks}/></>
  return (
    
    <MainPageStyled className="flex flex-col p-4">
      <div className="mb-4">
        <SearchInput
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Tasks title="All Tasks" tasks={tasksToShow} />
      {visibleTasks < filteredTasks.length && (
        <ShowMoreButton onClick={handleShowMore}>Show More</ShowMoreButton>
      )}
    </MainPageStyled>
  );
}

const MainPageStyled = styled.div`
  /* Add your styles here */
  min-height: 100vh; /* Full height */
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 2px solid #6d6b6d;
  border-radius: 12px;
  font-size: 16px;
  transition: border-color 0.3s;
  background-color: #381e3a;

  &:focus {
    border-color: #381e3a; /* Change border color on focus */
    outline: none;
  }
`;

const ShowMoreButton = styled.button`
  margin-top: 20px;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #381e3a; /* Darker shade on hover */
  }
`;

const Loader = styled.div`
  margin-top: 20px;
  font-size: 18px;
  color: #555;
`;