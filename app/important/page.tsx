"use client";

import React from 'react'
import { useGlobalState } from '../Context/GlobalProvider';
import Tasks from '../Components/Tasks/Tasks';

const Page = () => {
  const { importantTask } = useGlobalState(); 
  return <Tasks title="Important task" tasks={importantTask}/>
}

export default Page;