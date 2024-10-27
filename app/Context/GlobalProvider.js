"use client";

import React, {createContext, useState, useContext } from "react";
import themes from "./Themes";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalProvider = ({children})=> {

    const { user } = useUser();

    const [selectedTheme, setSelectedTheme] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [tasks, setTasks] = useState([]);
    const theme = themes[selectedTheme];
    const [modal, setModal] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    const openModal =  () => {
        setModal(true);
    }
    const closeModal =  () => {
        setModal(false);
    }
    const collapsMenu = () => {
        setCollapsed(!collapsed);
    }

    const allTasks = async  () => {    
        setIsLoading(true);
        try{
            const res = await axios.get("/api/tasks");
            setTasks(res.data);
            setIsLoading(false);
            console.log("All Tasks:", res.data);
        }catch(error){
            console.log(error);
        }
    }

    const deleteTask = async (id) => {
        try{
            const res = await axios.delete(`/api/tasks/${id}`);
            toast.success("Task deleted successfully");
            allTasks();
        }catch(error){
            console.log(error);
            toast.error("Something went wrong");
        }
    }

    const updateTask = async (task) => {
        try{
            const res = await axios.put(`/api/tasks`, task);
            toast.success("Task updated successfully");
            allTasks();
        }catch(error){
            console.log(error);
            toast.error("Something went wrong");
        }
    } 

    const completedTask = tasks.filter((task) => task.isCompleted === true);
    const importantTask = tasks.filter((task) => task.important === true);
    const inCompletedTask = tasks.filter((task) => task.isCompleted === false);

    React.useEffect(()=>{
        if (user) allTasks();
    },[user]);

    return(
        <GlobalContext.Provider value={{
            theme,
            tasks,
            deleteTask,
            isLoading,
            completedTask,
            importantTask,
            inCompletedTask,
            updateTask,
            modal,
            openModal,
            closeModal,
            allTasks,
            collapsed,
            collapsMenu,
        }}>
            <GlobalUpdateContext.Provider value={{}}>
                {children}
            </GlobalUpdateContext.Provider>
        </GlobalContext.Provider>
    )
};

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);