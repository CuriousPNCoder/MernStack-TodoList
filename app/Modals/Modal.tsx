"use client";
import React from 'react'
import { useGlobalState } from '../Context/GlobalProvider';
import styled from 'styled-components';

interface Props {
    content: React.ReactNode
}

export const Modal = ({ content }: Props) => {
    const { closeModal } = useGlobalState();
    const { theme } = useGlobalState();

    const handleOverlayClick = (e: React.MouseEvent) => {
        // Close the modal only if the click is on the overlay
        if (e.currentTarget === e.target) {
            closeModal();
        }
    };

    return (
        <ModalStyled theme={theme}>
            <div className="modal-overlay" onClick={handleOverlayClick}>
                <div className='modal-content'>{content}</div>
            </div>
        </ModalStyled>
    )
}

const ModalStyled = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
z-index: 100;


.modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: center;
    display: flex;
}
.modal-content{
    padding: 1.6rem;
    position: relative;
    width: 100%;
    max-width: 630px;
    z-index: 10;

    border-radius: 1rem;
    background-color: ${(props) => props.theme.colorBg2};
}
`;