import React from "react";
import '../styles/CloseButton.css'; 

const CloseButton = ({ onClick }) => {
    return (
        <button className="close-button" onClick={onClick}>
            Закрыть
        </button>
    );
};

export default CloseButton;
