"use client";
import React from 'react'
import GlobalStylesProvider from './GlobalStylesProvider';
import { GlobalProvider } from '../Context/GlobalProvider';

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
    <GlobalProvider>{children}</GlobalProvider>
  )
}

export default ContextProvider