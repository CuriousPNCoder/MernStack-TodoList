"use client";

import React from 'react'
import { useGlobalState } from '../Context/GlobalProvider';
import Tasks from '../Components/Tasks/Tasks';

const Page = () => {
  const { inCompletedTask } = useGlobalState(); 
  return <Tasks title="Incompleted task" tasks={inCompletedTask}/>
}

export default Page;