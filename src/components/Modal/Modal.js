import React from 'react';
import './Modal.css';



const Modal = (props) => {
    const closeicon = () => (
        <button
            onClick={closeModal}
            style={{
                color: '#000000',
                padding: '10px',
                cursor: 'pointer',
                backgroundColor: 'transparent',
                border: 0,
                outline: 'none',
                position: 'absolute',
                fontSize: '15px',
                top: '0.3rem',
                right: '0.5rem',
            }}
        >
           x
        </button>
    );

    const { closeModal, show } = props;
    return (
        show ? (
            <div className="overlay">
                <div className="content">
                    {closeicon()}
                    {props.children}
                </div>
            </div>
        ) : null);
};

export default Modal;