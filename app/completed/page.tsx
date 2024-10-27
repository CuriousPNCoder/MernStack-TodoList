"use client";

import React from 'react'
import { useGlobalState } from '../Context/GlobalProvider';
import Tasks from '../Components/Tasks/Tasks';

const Page = () => {
  const { completedTask } = useGlobalState();  // Fix here
  return <Tasks title="Completed task" tasks={completedTask}/>
}

export default Page