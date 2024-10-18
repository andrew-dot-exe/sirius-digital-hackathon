import React from "react";
import { useState } from "react";
import '../styles/СloseButton.css';

const CloseButton = ({onClick}) =>
{
    return (
        <button  className="close-button" onClick={onClick}>
            <img src = ""></img>
        </button>
    );
};

export default CloseButton;