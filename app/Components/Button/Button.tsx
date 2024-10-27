"use client";

import { useGlobalState } from '@/app/Context/GlobalProvider';
import React from 'react'
import styled from 'styled-components';

interface Props {
    icon?: string;
    name?: string;
    background?: string;
    paddding?: string;
    borderRad?: string;
    fw?: string;
    fs?: string;
    click?: () => void;
    type?: "submit" | "button" | "reset" | undefined;
    dClick?: () => void;
    border?: string;
}

const Button = ({icon, name, background, paddding, borderRad, fw, fs, click, type, dClick, border}: Props) => {
  
    const {theme} = useGlobalState();

    return (
    <ButtonStyled 
    type={type}
    style={{
        background: background,
        padding: paddding || "0.5rem 1rem",
        borderRadius: borderRad || "0.5rem",
        fontWeight: fw || "500",
        fontSize: fs,
        border: border || "none",
    }} theme={theme}
    onClick={click}>
        {icon && icon}
        {name}
    </ButtonStyled>
  )
}

const ButtonStyled = styled.button`
position: relative;
display: flex;
align-items: center;
color: ${(props) => props.theme.colorGrey2};
z-index: 5;
cursor: pointer;
transition: all 0.55s ease-in-out;

i{
    margin-right: 1rem;
    color: ${(props) => props.theme.colorGrey3};
    font-size: 1.5rem;
}
&:hover{
    color: ${(props) => props.theme.colorGrey2};
    i{
    color: ${(props) => props.theme.colorPrimaryGrey0};
    }
}
`;

export default Button