"use client";
import React from 'react'
import { GlobalProvider } from '../Context/GlobalProvider';
import {Toaster} from 'react-hot-toast';

interface Props{
    children: React.ReactNode;
}

function ContextProvider({children} : Props) {

    const [isReady, setIsReady] = React.useState(false);

    React.useEffect(() => {
        setTimeout(()=>{
            setIsReady(true);
        },2000);
    },[]);

    if(!isReady){
        return null;
    }

  return (
    <GlobalProvider>
        <Toaster/>
        {children}
        </GlobalProvider>
  )
}

export default ContextProvider